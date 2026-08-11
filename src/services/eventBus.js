/**
 * Account & Orders Microfrontend Event Bus
 * Facilitates cross-microfrontend communications via CustomEvents on the global window object.
 */

export const ACCOUNT_EVENTS = {
  USER_LOGIN: "ecoswap:user-login",
  USER_LOGOUT: "ecoswap:user-logout",
  USER_REGISTER: "ecoswap:user-register",
  ADD_TO_CART: "ecoswap:add-to-cart",
  WISHLIST_UPDATED: "ecoswap:wishlist-updated",
  PROFILE_UPDATED: "ecoswap:profile-updated",
};

/**
 * Broadcast a custom event to the Shell and peer microfrontends
 * @param {string} eventName
 * @param {object} detailData
 */
export const dispatchAccountEvent = (eventName, detailData = {}) => {
  if (typeof window !== "undefined") {
    const event = new CustomEvent(eventName, {
      detail: detailData,
      bubbles: true,
      composed: true, // allows event to cross shadow DOM boundaries if Web Components are used
    });
    window.dispatchEvent(event);
    console.log(`[Account MFE Event Dispatched] -> ${eventName}`, detailData);
  }
};

/**
 * Subscribe to a custom event from Shell or peer microfrontends
 * @param {string} eventName
 * @param {function} handler
 * @returns {function} unsubscribe function
 */
export const subscribeAccountEvent = (eventName, handler) => {
  if (typeof window === "undefined") return () => {};

  const listener = (event) => handler(event.detail);
  window.addEventListener(eventName, listener);

  return () => {
    window.removeEventListener(eventName, listener);
  };
};
