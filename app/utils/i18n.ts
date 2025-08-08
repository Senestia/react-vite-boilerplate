import i18next, { type i18n as I18nInstance } from "i18next"
import { initReactI18next } from "react-i18next"

// Defer browser-only plugins to client to avoid SSR issues
const isBrowser = typeof window !== "undefined"

const i18n: I18nInstance = i18next.createInstance()

if (isBrowser) {
  // Lazy import to keep server bundle clean
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  ;(async () => {
    const [{ default: HttpBackend }, { default: LanguageDetector }] =
      await Promise.all([
        import("i18next-http-backend"),
        import("i18next-browser-languagedetector"),
      ])

    i18n
      .use(HttpBackend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        fallbackLng: "th",
        supportedLngs: ["en", "th"],
        ns: ["translation"],
        defaultNS: "translation",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        detection: {
          order: [
            "htmlTag",
            "querystring",
            "cookie",
            "localStorage",
            "navigator",
          ],
          caches: ["localStorage", "cookie"],
        },
        backend: {
          loadPath: "/locales/{{lng}}.json",
        },
      })
  })()
} else {
  // Server-side: init minimal instance to prevent hook errors
  // Do not load resources here; default to fallback language
  i18n.use(initReactI18next).init({
    lng: "th",
    fallbackLng: "th",
    supportedLngs: ["en", "th"],
    ns: ["translation"],
    defaultNS: "translation",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })
}

export default i18n
