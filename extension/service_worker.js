const filter = {
  url: [
    {
      urlMatches: 'https://www.youtube.com',
    },
  ],
};

let current_url = 'EMPTY';

chrome.webNavigation.onCompleted.addListener(({ url }) => {
  if (!url.includes(current_url)) {
    console.log(`(ONCOMPLETE): changing current_url from ${current_url} to ${url}`);
    current_url = url;
  }
}, filter);

chrome.webNavigation.onHistoryStateUpdated.addListener(({ url }) => {
  if (!url.includes(current_url)) {
    console.log(`(ONHSU): changing current_url from ${current_url} to ${url}`);
    current_url = url;
  }
}, filter);