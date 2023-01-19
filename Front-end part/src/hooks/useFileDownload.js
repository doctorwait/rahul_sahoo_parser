import { checkResponse } from "../utils/utils";

function useFileDownload() {
  const handleFileDownload = (fetchURL, fileName) => {
    return fetch(fetchURL, {
      method: 'GET',
      headers: {
      },
    })
      .then(checkResponse)
      .then(res => res.blob())
      .then(blob => {
        const downloadURL = window.URL.createObjectURL(blob);
        const downloadLinkElement = Object.assign(document.createElement('a'), {
          href: downloadURL,
          style: 'display: none',
          download: fileName,
        });

        document.body.appendChild(downloadLinkElement);
        downloadLinkElement.click();

        URL.revokeObjectURL(downloadURL);
        downloadLinkElement.remove();
      })
      .catch(err => `Unable to download file. Error: ${err}`);
  }

  // Just dummy function for tests. When API will be ready use "useFileDownload" function to download file from API

  function mockDownloadFile(inputsValue) {
    const data = `Keyword: ${inputsValue.keyword}; City: ${inputsValue.city};`;

    const blob = new Blob([data], { type: "octet-stream" });

    const downloadURL = window.URL.createObjectURL(blob);
    const downloadLinkElement = Object.assign(document.createElement('a'), {
      href: downloadURL,
      style: 'display: none',
      download: 'test.txt',
    });

    document.body.appendChild(downloadLinkElement);
    downloadLinkElement.click();

    URL.revokeObjectURL(downloadURL);
    downloadLinkElement.remove();
  }

  return { handleFileDownload, mockDownloadFile };
}

export default useFileDownload;