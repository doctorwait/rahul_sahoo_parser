import sqlite3
import sys

from selenium.webdriver.chrome.options import Options
import time
from geopy.geocoders import Nominatim
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
import pandas as pd
import requests
from bs4 import BeautifulSoup as bs4
from fake_useragent import UserAgent
import re
import logging


class ParserMain:
    def __init__(self):
        self.options = Options()
        self.options.headless = True

        self.browser = webdriver.Chrome(options=self.options)
        self.browser.delete_all_cookies()
        self.wait = WebDriverWait(self.browser, 100)
        self.browser.implicitly_wait(3)

        self.browser2 = webdriver.Chrome(options=self.options)
        self.browser2.delete_all_cookies()
        self.browser2.implicitly_wait(3)

        self.master_list = []
        self.companies = []

    def save_data(self, company_name, address, url_map, link, phone_number,
                  email, query):
        data_dict = {'company_name': company_name, 'address': address,
                     'link': link, 'phone_number': phone_number,
                     'url_map': url_map, 'email': email}
        self.master_list.append(data_dict)
        #print(len(self.companies), self.companies)
        print(data_dict, len(self.master_list), '=' * 80, sep='\n')

        df = pd.DataFrame(self.master_list)
        df.to_excel(f'{query}.xlsx', index=False)

    def find_emails_on_a_page(self, html):
        page_html = bs4(html, "html.parser")

        tag_name_list = []
        all_tags_list = page_html.findAll(True)
        emails_list = []

        for tag in all_tags_list:
            if tag.name not in tag_name_list:
                tag_name_list.append(tag.name)

        for tag in tag_name_list:
            list_of_all_tags_of_this_type = page_html.find_all(tag)
            for individual_tag in list_of_all_tags_of_this_type:
                if len(individual_tag.findChildren()) <= 1:
                    tag_emails = re.findall(r'[\w\.-]+@[\w\.-]+', individual_tag.text)
                    for email in tag_emails:
                        if email not in emails_list:
                            emails_list.append(email)
        return emails_list

    def sql(town, location):
        """Записывает данные в базу данных sqlite"""
        con = sqlite3.connect('db.sqlite')
        cur = con.cursor()
        cur.execute('''
        CREATE TABLE IF NOT EXISTS weather(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date text,
            town text,
            location text,
            result text);
        ''')
        try:
            sqlite_with_parametrs = '''INSERT INTO
                                       weather(date, town, location, result)
                                       VALUES (?, ?, ?, ?);'''
            data_tuple = (datetime.now(), town, str(location), 'Greate!')
            cur.execute(sqlite_with_parametrs, data_tuple)
            con.commit()
            con.close()
            logging.info('Данные в sqlite успешно записаны!')
        except ValueError as error:
            logging.error(f'Ошибка при записи данных в sqlite: {error}')

    def get_data(self, query):
        url = f"https://www.google.com/maps/search/{query}"
        self.browser.get(url)
        time.sleep(2)
        self.browser.maximize_window()
        time.sleep(2)

        while len(self.companies) < 2:
            scrollable_div = self.browser.find_element(By.XPATH,
                                                  '//div[@role="main"]/div[2]/div[1]')

            self.browser.execute_script(
                'arguments[0].scrollTop = arguments[0].scrollHeight',
                scrollable_div)
            time.sleep(2)
            self.browser.execute_script(
                'arguments[0].scrollTop = arguments[0].scrollHeight',
                scrollable_div)
            time.sleep(2)
            self.browser.execute_script(
                'arguments[0].scrollTop = arguments[0].scrollHeight',
                scrollable_div)
            time.sleep(2)
            self.browser.execute_script(
                'arguments[0].scrollTop = arguments[0].scrollHeight',
                scrollable_div)
            time.sleep(2)
            soup = BeautifulSoup(self.browser.page_source, 'html.parser')
            cards = soup.select('div[jsaction^="mouseover:pane.wfvdle"]')
            for card in cards:
                company_name = ' '.join(card.find('div', 'NrDZNb').text.split())
                if company_name not in self.companies and len(self.companies) < 2:
                    self.companies.append(company_name)
                    url_map = card.find('a')['href']

                    self.browser2.get(url_map)
                    time.sleep(3)
                    company_html = self.browser2.page_source
                    soup_company = BeautifulSoup(company_html, 'lxml')
                    try:
                        address = ' '.join(soup_company.select_one(
                            'button[data-item-id="address"] div[jsan="7.Io6YTe,7.fontBodyMedium"]').text.split())
                    except:
                        address = ''

                    try:
                        href = soup_company.select_one(
                            'div a[data-item-id="authority"]'
                        )['aria-label']
                        link = 'https://' + ''.join(href).split()[1]
                    except:
                        link = ''

                    try:
                        phone = soup_company.select_one(
                            'div button[data-item-id*="phone"]'
                        )['aria-label']
                        phone_number = ''.join(phone).split(':')[1]
                    except:
                        phone_number = ''

                    try:
                        headers = {'User-Agent': str(UserAgent().random)}
                        page_request = requests.get(link, headers=headers,
                                                    timeout=30)
                        email = self.find_emails_on_a_page(page_request.text)
                    except:
                        email = ''

                    self.save_data(
                        company_name, address, url_map, link,
                        phone_number, email, query
                    )
                else:
                    logging.info("The number of companies has reached the intended maximum")
                    break

            if soup.select_one(
                    'button[aria-label=" Next page "][disabled="true"]'):
                logging.info("Last page reached")
                break
            elif soup.select_one('button[aria-label=" Next page "]'):
                next_page = self.browser.find_element(By.CSS_SELECTOR,
                                                      'button[aria-label=" Next page "]')
                self.browser.execute_script("arguments[0].click();",
                                            next_page)
                logging.info("Navigating to Next Page")
                time.sleep(3)

    def run(self):
        logging.basicConfig(
            level=logging.DEBUG,
            format=('%(asctime)s - '
                    '%(levelname)s - '
                    '%(message)s - '
                    '%(name)s - '
                    '%(filename)s - '
                    '%(funcName)s - '
                    '%(lineno)s'),
            handlers=[
                logging.FileHandler('script.log', 'a', encoding='utf8'),
                logging.StreamHandler(sys.stdout),
            ],
        )
        start_time = time.time()
        query = input("Введите через пробел локацию и ключевое слово:").strip().replace(' ', '+')
        self.get_data(query)
        print("--- %s minutes ---" % ((time.time() - start_time) / 60))


if __name__ == '__main__':
    parser = ParserMain()
    parser.run()