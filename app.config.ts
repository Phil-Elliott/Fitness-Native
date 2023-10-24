import "dotenv/config";

export default {
  name: "YourAppName",
  version: "1.0.0",
  extra: {
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  },
};
