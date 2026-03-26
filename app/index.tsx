import { useAuthStore } from "@/store/useAuthStore";
import React from "react";
import { Text } from "react-native";
const session = useAuthStore((state) => state.session);
console.log("Session:", session);

const index = () => {
  return <Text className="text-red-500 font-bold">Hello</Text>;
};

export default index;
