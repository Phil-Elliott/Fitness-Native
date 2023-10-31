import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { Stack, Slot, useRouter, useSegments } from "expo-router";
import Constants from "expo-constants";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(auth)";

    console.log("User changed: ", isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      router.replace("/home");
    } else if (!isSignedIn) {
      router.replace("/login");
    }
  }, [isSignedIn]);

  return <Slot />;
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const StackLayout = () => {
  return (
    <Provider store={store}>
      <ClerkProvider
        publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
        tokenCache={tokenCache}
      >
        <InitialLayout />
      </ClerkProvider>
    </Provider>
  );
};

export default StackLayout;
