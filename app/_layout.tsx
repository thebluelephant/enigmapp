import { EnigmappContextProvider } from "@/utils/EnigmappContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import moment from "moment";
import { useFonts, Roboto_700Bold } from "@expo-google-fonts/roboto";
const queryClient = new QueryClient()
import { Auth0Provider } from 'react-native-auth0';
import 'moment/locale/fr';




export default function RootLayout() {
  moment.locale('fr');
  useFonts({
    Roboto_700Bold,
  });

  return (
    <Auth0Provider domain={process.env.EXPO_PUBLIC_AUTH0_DOMAIN} clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENTID}>
      <QueryClientProvider client={queryClient}>
        <EnigmappContextProvider>
          <Stack screenOptions={{
            headerShown: false,
            animation: 'fade',
            animationDuration: 2000,
          }} />
        </EnigmappContextProvider>
      </QueryClientProvider>
    </Auth0Provider>

  )
}