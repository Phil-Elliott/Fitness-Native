import { useEffect } from "react";

import { Slot, useRouter, useSegments } from "expo-router";
import Constants from "expo-constants";

import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

import store from "../redux/store";
import { useDispatch, Provider } from "react-redux";
import { setUserDetails } from "../redux/slices/userSlice";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const segments = useSegments();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(auth)";

    console.log("User changed: ", isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      router.replace("/home");

      // Update Redux store with user details
      const userDetails = {
        firstName: user?.firstName || null,
        lastName: user?.lastName || null,
        username: user?.username || null,
        imageUrl: user?.imageUrl || null,
        primaryEmailAddress: user?.primaryEmailAddress?.emailAddress || null,
      };
      dispatch(setUserDetails(userDetails));
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
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
      tokenCache={tokenCache}
    >
      <Provider store={store}>
        <InitialLayout />
      </Provider>
    </ClerkProvider>
  );
};

export default StackLayout;
