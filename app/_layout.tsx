import { EnigmappContextProvider } from "@/utils/EnigmappContext";
import { useObjectDetectionModels, useObjectDetectionProvider } from "@infinitered/react-native-mlkit-object-detection";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient()

export default function RootLayout() {
  const models = useObjectDetectionModels({

    loadDefaultModel: true, // whether to load the default model
    defaultModelOptions: {
      shouldEnableMultipleObjects: true,
      shouldEnableClassification: true,
      detectorMode: "singleImage",
    },
  });

  // Get the provider component
  const { ObjectDetectionProvider } = useObjectDetectionProvider(models);

  return (
    <EnigmappContextProvider>
      <QueryClientProvider client={queryClient}>
        <ObjectDetectionProvider>
          <Stack screenOptions={{
            headerShown: false
          }} />
        </ObjectDetectionProvider>
      </QueryClientProvider>
    </EnigmappContextProvider>
  )
}