import { useEffect } from "react";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";

export function useDeepLinkLogin() {
    const router = useRouter()


    useEffect(() => {
        const handleUrl = ({ url }: { url: string }) => {
            const { path } = Linking.parse(url);
            if (path === "home") {
                router.push('/home')
            }
        };

        const subscription = Linking.addEventListener("url", handleUrl);

        // If app has been cold started
        Linking.getInitialURL().then((url) => {
            if (url) handleUrl({ url });
        });

        return () => subscription.remove();
    }, []);
}
