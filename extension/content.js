// const ws = new WebSocket("ws://127.0.0.1:8080");

// let titles;

// ws.addEventListener("open", () => {
//   titles = Array.from(document.querySelectorAll('yt-formatted-string#video-title'), element => element.innerText);

//   const observer = new PerformanceObserver((list) => {
//     list.getEntries().forEach((entry) => {
//       if (entry.name.includes('https://yt3.ggpht.com/')) {
//         titles = Array.from(document.querySelectorAll('yt-formatted-string#video-title'), element => element.innerText);

//         ws.send(`${titles}`);
//       }
//     });
//   });
  
//   observer.observe({ type: "resource", buffered: true });
// });

// ws.addEventListener("close", () => ws.close());

// ws.addEventListener("error", err => console.log(err));

// initiatorType = "fetch"
// 

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.initiatorType === "fetch" && entry.name.includes(".googlevideo.com/videoplayback?")) console.log(entry);
  });
});

// observer.observe({ type: "resource", buffered: true });
observer.observe({ entryTypes: ['resource'] });