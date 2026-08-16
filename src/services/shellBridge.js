import { ACCOUNT_EVENTS, subscribeAccountEvent } from "./eventBus";

export function postToShell(type, detail = {}) {
  if (window.parent !== window) {
    window.parent.postMessage({ source: "ecoswap-account", type, detail }, "*");
  }
}

Object.values(ACCOUNT_EVENTS).forEach((eventName) => {
  subscribeAccountEvent(eventName, (detail) => postToShell(eventName, detail));
});

window.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || typeof data !== "object" || data.source !== "ecoswap-shell") return;

  if (data.type === "shell:wishlist-toggle") {
    console.log("[Account] wishlist item from Catalog:", data.detail);
  }

  if (data.type === "shell:order-placed") {
    console.log("[Account] new order from Cart:", data.detail);
  }
});
