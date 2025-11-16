import { TranslationString } from "@/types/Generic";
import { getLocales } from "expo-localization";

export const getLocale = () => (getLocales()[0].languageCode ?? 'en') as keyof TranslationString;