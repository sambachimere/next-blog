import React from "react";
import { auth, firestore } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// CUSTOM HOOK TO READ AUTH RECORD AND USER PROFILE DOC
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = React.useState(null);

  React.useEffect(() => {
    // turn off realtime subscriptions
    let unsubscribe;

    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}
