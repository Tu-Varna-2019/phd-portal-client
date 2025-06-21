module.exports = {
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: () => Promise.resolve(),
      language: "en"
    },
    ready: true
  }),
  withTranslation: () => (Component) => {
    Component.defaultProps = { ...Component.defaultProps, t: (key) => key };
    return Component;
  },
  Trans: ({ children }) => children,
  initReactI18next: {
    type: "3rdParty",
    init: () => {}
  }
};
