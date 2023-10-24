import { ClerkProvider } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import Constants from "expo-constants";

const StackLayout = () => {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
    >
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ClerkProvider>
  );
};

export default StackLayout;
