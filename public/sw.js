self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "START_TIMER") {
    const delay = event.data.delay;

    setTimeout(() => {
      self.registration.showNotification("Workout Timer Done!", {
        body: "Time to continue your workout 💪",
        icon: "/icon-192.png",
      });
    }, delay);
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clients) => {
      if (clients.length > 0) {
        clients[0].focus();
      } else {
        self.clients.openWindow("/");
      }
    })
  );
});