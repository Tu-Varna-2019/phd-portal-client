const isBrowser = typeof window !== "undefined";

/* eslint-disable no-undef */
module.exports = {
  i18n: {
    defaultLocale: "bg",
    locales: ["en", "bg"],
    localeDetection: false
  },
  partialBundledLanguages: isBrowser && true
};
