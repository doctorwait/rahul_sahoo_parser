from seleniumwire.webdriver import ChromeOptions
from seleniumwire import webdriver
from selenium.webdriver.common.by import By

import pandas as pd
from bs4 import BeautifulSoup as bs4

import time
import re

API_KEY = 'f4b5892c3b43ef37a6f95dcdd29b743d'
NUM_RETRIES = 3


class ParserMain:
    IMPLICITLY_WAIT = 10

    def __init__(self, executable_path=None, make_window_invisible=True, proxy=False):
        self.executable_path = executable_path
        if proxy is True:
            self.proxy_options = {'proxy': {
                    'http': f'http://scraperapi.render=true:{API_KEY}@proxy-server.scraperapi.com:8001',
                    'https': f'http://scraperapi.render=true:{API_KEY}@proxy-server.scraperapi.com:8001',
                    'no_proxy': 'localhost,127.0.0.1'}}
        else:
            self.proxy_options = None

        self.options = ChromeOptions()
        if make_window_invisible:
            self.options.add_argument('--headless')
        self.options.add_argument('--no-sandbox')
        self.options.add_argument('--disable-dev-sh-usage')

        self.master_list = []
        self.companies = []

    def driver_initialize(self):
        """
        Возвращает экземпляр браузера, задавая сразу же время неявных ожиданий.
        """
        if self.executable_path:
            driver = webdriver.Chrome(options=self.options, seleniumwire_options=self.proxy_options,
                                      executable_path=self.executable_path)
        else:
            driver = webdriver.Chrome(options=self.options, seleniumwire_options=self.proxy_options)

        driver.implicitly_wait(self.IMPLICITLY_WAIT)
        return driver

    def save_data(self, company_name, address, url_map, link, phone_number,
                  email, query):
        data_dict = {'company_name': company_name, 'address': address,
                     'link': link, 'phone_number': phone_number,
                     'url_map': url_map, 'email': email}
        self.master_list.append(data_dict)
        print(len(self.companies), self.companies)
        print(data_dict, len(self.master_list), '=' * 80, sep='\n')

        df = pd.DataFrame(self.master_list)
        df.to_excel(f'{query}.xlsx', index=False)

    def find_emails_on_a_page(self, html):
        """
        Принимает на вход сырой html-код.
        """
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

    def get_data(self, query):  # TODO функция перегружена, хорошо бы упростить ;)
        def scroll_current_page(driver, scrollable_div):
            driver.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', scrollable_div)
        url = f"https://www.google.com/maps/search/{query}"
        driver = self.driver_initialize()
        print("Загружаю страницу с картой")
        driver.get(url)
        print("Загрузил страницу")
        time.sleep(2)  # TODO по идее тайм-ожидания в скрипте не должно быть, надо отталкиваться от появления элемента
        driver.maximize_window()
        time.sleep(1)
        while len(self.companies) < 5:
            scrollable_div = driver.find_element(By.XPATH, '//div[@role="main"]/div[2]/div[1]')
            scroll_current_page(driver, scrollable_div)
            time.sleep(2)  # TODO то же самое
            scroll_current_page(driver, scrollable_div)
            time.sleep(2)
            scroll_current_page(driver, scrollable_div)
            time.sleep(2)
            scroll_current_page(driver, scrollable_div)
            time.sleep(2)

            soup = bs4(driver.page_source, 'html.parser')
            driver.close()
            cards = soup.select('div[jsaction^="mouseover:pane.wfvdle"]')

            for card in cards:
                company_name = ' '.join(card.find('div', 'NrDZNb').text.split())
                if company_name not in self.companies and len(self.companies) < 5:
                    self.companies.append(company_name)
                    url_map = card.find('a')['href']
                    driver_2 = self.driver_initialize()
                    driver_2.maximize_window()
                    driver_2.get(url_map)
                    time.sleep(3)
                    company_html = driver_2.page_source
                    driver_2.close()  # TODO я добавил закрытие браузера, т.к. он вызывался в цикле while True
                    soup_company = bs4(company_html, 'html.parser')
                    try:
                        address = ' '.join(soup_company.select_one(
                            'button[data-item-id="address"] div[jsan="7.Io6YTe,7.fontBodyMedium"]'
                            ).text.split())
                    except:
                        address = ''
                    try:
                        href = soup_company.select_one('div a[data-item-id="authority"]')['aria-label']
                        link = 'https://' + ''.join(href).split()[1]
                    except:
                        link = ''
                    try:
                        phone = soup_company.select_one('div button[data-item-id*="phone"]')['aria-label']
                        phone_number = ''.join(phone).split(':')[1]
                    except:
                        phone_number = ''
                    try:
                        driver_for_emails = self.driver_initialize()
                        driver_for_emails.get(link)
                        html_code = driver_for_emails.page_source
                        driver_for_emails.close()
                        email = self.find_emails_on_a_page(html_code)  # TODO глянь пожалуйста, вроде правильно передал html
                    except BaseException as ex:
                        print(ex.args)
                        email = ''

                    self.save_data(company_name, address, url_map, link,
                                   phone_number, email, query)
                else:
                    break

            if soup.select_one(
                    'button[aria-label=" Next page "][disabled="true"]'):
                print("Last page reached")
                break
            elif soup.select_one('button[aria-label=" Next page "]'):
                next_page = driver.find_element(By.CSS_SELECTOR,
                                                 'button[aria-label=" Next page "]')
                driver.execute_script("arguments[0].click();", next_page)
                print("Navigating to Next Page")
                time.sleep(3)

    def run(self):
        start_time = time.time()
        query = input("Введите через пробел локацию и ключевое слово:").strip().replace(' ', '+')
        self.get_data(query)
        print("--- %s minutes ---" % ((time.time() - start_time) / 60))


if __name__ == '__main__':

    parser = ParserMain()  # make_window_invisible=True
    parser.run()
