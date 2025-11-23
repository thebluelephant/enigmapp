import { supabase } from "@/api/core";
import { useEnigmappContext } from "@/utils/EnigmappContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter()
  const { setUserId } = useEnigmappContext()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUserId(session.user.id)
        router.replace('/dashboard')
      } else router.replace('/home')
    })
  }, [])
}


export default Index