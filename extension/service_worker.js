const ws = new WebSocket("ws://127.0.0.1:8080");

ws.addEventListener("open", () => {
  const filter = {
    url: [
      {
        urlMatches: 'https://www.youtube.com',
      },
    ],
  };

  let current_url = 'EMPTY';

  const handle_navigation = (event, url) => {
    if (!url.includes(current_url) && url.startsWith("https://www.youtube.com/watch?v")) {
      let saved_state;

      chrome.storage.sync.get(['savedState'], result => {
        if (result.savedState) saved_state = result.savedState;
      });

      console.log(`(${event}): changing current_url from ${current_url} to ${url}`);
      console.log(`(${event}): current language is ${saved_state}`);
      current_url = url;

      ws.send(current_url);
      console.log(`(${event}): sending url to wss`);
    }
  }

  chrome.webNavigation.onCompleted.addListener(({ url }) => handle_navigation("ONCOMPLETE", url), filter);

  chrome.webNavigation.onHistoryStateUpdated.addListener(({ url }) => handle_navigation("ONHSU", url), filter);
});

ws.addEventListener("close", () => ws.close());

ws.addEventListener("error", err => console.log(err));
