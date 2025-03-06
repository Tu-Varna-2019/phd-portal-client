const isBrowser = typeof window !== "undefined";
/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "bg",
    locales: ["en", "bg"]
  },
  partialBundledLanguages: isBrowser && true
};
