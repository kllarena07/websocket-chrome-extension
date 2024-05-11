// Commenting out because this extracts data in a format that needs some extra research on

// const ws = new WebSocket("ws://127.0.0.1:8080");

// ws.addEventListener("open", () => {
//   const observer = new PerformanceObserver((list) => {
//     list.getEntries().forEach((entry) => {
//       if (entry.initiatorType === "fetch" && entry.name.includes(".googlevideo.com/videoplayback?")) {
//         console.log(entry);
//         ws.send(entry.name);
//       }
//     });
//   });
  
//   observer.observe({ entryTypes: ['resource'] });
// });

// ws.addEventListener("close", () => ws.close());

// ws.addEventListener("error", err => console.log(err));
