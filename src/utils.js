export const isBrowser = typeof window !== "undefined" && window.document;

export const loadGoogleMapScript = (
  googleMapsScriptBaseUrl,
  googleMapsScriptUrl
) => {
  if (!isBrowser) return Promise.resolve();

  if (typeof google !== "undefined") {
    if (google.maps && google.maps.api) return Promise.resolve();
  }

  const scriptElements = document.querySelectorAll(
    `script[src*="${googleMapsScriptBaseUrl}"]`
  );

  if (scriptElements && scriptElements.length) {
    return new Promise((resolve) => {
      // in case we already have a script on the page and it's loaded we resolve
      if (typeof google !== "undefined") return resolve();

      // otherwise we wait until it's loaded and resolve
      scriptElements[0].addEventListener("load", () => resolve());
    });
  }

  let scriptUrl = new URL(googleMapsScriptUrl);
  scriptUrl.searchParams.set(
    "callback",
    "__REACT_GOOGLE_AUTOCOMPLETE_CALLBACK__"
  );
  const el = document.createElement("script");
  el.src = scriptUrl.toString();

  return new Promise((resolve) => {
    window.__REACT_GOOGLE_AUTOCOMPLETE_CALLBACK__ = resolve;
    document.body.appendChild(el);
  });
};
