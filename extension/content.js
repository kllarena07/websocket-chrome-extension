const ws = new WebSocket("ws://127.0.0.1:8080");

ws.addEventListener("open", () => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name.includes('https://yt3.ggpht.com/')) {
        ws.send(entry.name);
      }
    });
  });
  
  observer.observe({ type: "resource", buffered: true });
});

ws.addEventListener("error", err => console.log(err));