import { EnigmappContextProvider } from "@/utils/EnigmappContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient()

export default function RootLayout() {

  return (
    <QueryClientProvider client={queryClient}>
      <EnigmappContextProvider>
        <Stack screenOptions={{
          headerShown: false
        }} />
      </EnigmappContextProvider>
    </QueryClientProvider>

  )
}