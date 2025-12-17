import { fetchAccountById, insertAccount } from "@/api/Account";
import { supabase } from "@/api/core";
import { useEnigmappContext } from "@/utils/EnigmappContext";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter()
  const { userId, setUserId } = useEnigmappContext()

  const logIn = (session: Session) => {
    setUserId(session.user.id)
    router.replace('/dashboard')
  }
  const signInAnonymously = async () => {
    const { data: { user, session }, error } = await supabase.auth.signInAnonymously()

    if (user && session) {
      setUserId(session.user.id)
      const existingAccount = await fetchAccountById(user.id)

      if (existingAccount) {
        const hasNotBeenOnboarded = !existingAccount.onboarded
        router.replace(hasNotBeenOnboarded ? '/onboarding' : '/dashboard')
      } else {
        // Insert manualy new user in account table
        await insertAccount(user.id)
        router.replace('/onboarding')
      }
    }
  }

  const getSessionOrSignIn = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      logIn(session)
    } else {
      signInAnonymously()
    }
  }


  useEffect(() => {
    if (!userId) {
      getSessionOrSignIn()
    }
  }, [userId]);
}


export default Index