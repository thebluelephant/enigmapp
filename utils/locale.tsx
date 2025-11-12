import { getLocales } from "expo-localization";

export const getLocale = () => getLocales()[0].languageCode ?? 'en';