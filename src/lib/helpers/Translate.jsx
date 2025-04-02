import { useTranslation } from "react-i18next";

export default function Translate() {
  const { t, i18n, ready } = useTranslation("client-page");

  const tr = (text, lang = i18n.language) => {
    return ready ? t(text, { lng: lang }) : text;
  };

  const changeLanguage = (event) => {
    const langCode = tr(event.target.value, "en");

    localStorage.setItem("language", langCode);
    i18n.changeLanguage(langCode);
  };

  const language = i18n.language;

  return { tr, changeLanguage, language };
}
