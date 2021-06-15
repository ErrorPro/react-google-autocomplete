import { Loader } from "@googlemaps/js-api-loader";

export const isBrowser = typeof window !== "undefined" && window.document;

export const loadGoogleMapScript = (options) => {
  if (!isBrowser) return Promise.resolve();

  const loader = new Loader(options);

  return loader.load();
};
