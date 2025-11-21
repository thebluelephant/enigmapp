import { EnigmappContextProvider } from "@/utils/EnigmappContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import moment from "moment";
import { useFonts, Roboto_700Bold } from "@expo-google-fonts/roboto";
const queryClient = new QueryClient()
import 'moment/locale/fr';
import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  moment.locale('fr');
  useFonts({
    Roboto_700Bold,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <EnigmappContextProvider>
        <Stack screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 2000,
        }} />
      </EnigmappContextProvider>
    </QueryClientProvider>

  )
}