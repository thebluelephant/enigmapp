import { EnigmappContextProvider } from "@/utils/EnigmappContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useFonts, Roboto_700Bold } from "@expo-google-fonts/roboto";

const queryClient = new QueryClient()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
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