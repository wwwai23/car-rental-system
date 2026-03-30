// import { useAuthStore } from "@/store/useAuthStore";
// import React from "react";
// import { Text } from "react-native";
// const session = useAuthStore((state) => state.session);
// console.log("Session:", session);

// const index = () => {
//   return <Text className="text-red-500 font-bold">Hello</Text>;
// };

// export default index;

import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";
export default function Index() {
  const { session, isLoading } = useAuthStore();
  if (isLoading) {
    return null; // Wait for auth to initialize
  }
  if (!session) {
    return <Redirect href="/auth/login" />;
  }
  // Both renters and owners go to the same (tabs) layout.
  // The tab layout handles showing/hiding tabs based on role.
  return <Redirect href="/(tabs)" />;
}
