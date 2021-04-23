export const isBrowser = typeof window !== "undefined" && window.document;

export const loadGoogleMapScript = (
  googleMapsScriptBaseUrl,
  googleMapsScriptUrl
) => {
  if (!isBrowser) return Promise.resolve();

  const [scriptElement] = document.querySelectorAll(
    `script[src*="${googleMapsScriptBaseUrl}"`
  );

  if (scriptElement) {
    return new Promise((resolve) => {
      // in case we already have a script on the page and it's loaded we resolve
      if (typeof google !== "undefined") return resolve();

      // otherwise we wait until it's loaded and resolve
      scriptElement.addEventListener("load", () => resolve());
    });
  }

  const el = document.createElement("script");
  el.src = googleMapsScriptUrl;

  document.body.appendChild(el);

  return new Promise((resolve) => {
    el.addEventListener("load", () => resolve());
  });
};
