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

  chrome.webNavigation.onCompleted.addListener(({ url }) => {
    if (!url.includes(current_url) && url.startsWith("https://www.youtube.com/watch?v")) {
      console.log(`(ONCOMPLETE): changing current_url from ${current_url} to ${url}`);
      current_url = url;

      ws.send(current_url);
      console.log("(ONCOMPLETE): sending url to wss");
    }
  }, filter);

  chrome.webNavigation.onHistoryStateUpdated.addListener(({ url }) => {
    if (!url.includes(current_url) && url.startsWith("https://www.youtube.com/watch?v")) {
      console.log(`(ONHSU): changing current_url from ${current_url} to ${url}`);
      current_url = url;

      ws.send(current_url);
      console.log("(ONHSU): sending url to wss");
    }
  }, filter);
});

ws.addEventListener("close", () => ws.close());

ws.addEventListener("error", err => console.log(err));
