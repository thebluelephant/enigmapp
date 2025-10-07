import { useEnigmappContext } from "@/utils/EnigmappContext";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { useAuth0 } from "react-native-auth0";

const Index = () => {
  const { user, isLoading } = useAuth0();
  const { setUserId } = useEnigmappContext()

  useEffect(() => {
    setUserId(user?.sub ?? '')
  }, [user]);

  if (isLoading) {
    return null;
  }

  return <Redirect href={user ? '/home' : '/login'} />;
}


export default Index