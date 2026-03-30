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

  if (isLoading) return null; // Wait for the Brain

  // Is the user logged in? Send them inside!
  if (session) {
    return <Redirect href="/(protected)" />;
  }

  // Not logged in? Send to the front door!
  return <Redirect href="/auth/login" />;
}
