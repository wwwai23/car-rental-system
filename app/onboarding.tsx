import { Button, ButtonText } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Find the Perfect Car",
    description: "Browse cars available near you.",
  },
  {
    id: "2",
    title: "Easy Booking",
    description: "Reserve your car in seconds.",
  },
  {
    id: "3",
    title: "Start your Journey",
    description: "Pick up your car and enjoy the ride.",
  },
];
export default function Onboarding() {
  const router = useRouter();
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding); // <--- Get action
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFinish = () => {
    completeOnboarding(); // Mark as seen in storage
    router.replace("/auth/login"); // Use replace so they can't go back
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1); // Update the dot immediately
    }
  };

  const renderItem = (
    { item, index }: any, // 1. Added 'index' here
  ) => (
    <View style={{ width, padding: 40, paddingTop: 100 }}>
      {/* 2. This now uses the specific item data for EACH slide */}
      <Text style={{ fontSize: 32, fontWeight: "bold", color: "#1E3A8A" }}>
        {item.title}
      </Text>
      <Text style={{ fontSize: 16, marginTop: 10, color: "#1b556b" }}>
        {item.description}
      </Text>

      {/* 3. Check 'index' (the slide number) instead of 'currentIndex' (the scroll state) */}
      {index === slides.length - 1 && (
        <View style={{ marginTop: 40, alignItems: "flex-start" }}>
          {/* <Button
            onPress={() => router.push("/auth/login")}
            style={{ borderRadius: 25 }}
          > */}
          <Button
            onPress={handleFinish}
            style={{ borderRadius: 25, backgroundColor: "#16A8E3" }}
          >
            <ButtonText>Get Started ≫≫</ButtonText>
          </Button>
        </View>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F7FDFF" }}>
      {/* Top Navigation */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          paddingTop: 50,
          position: "absolute",
          width: "100%",
          zIndex: 10,
        }}
      >
        {currentIndex < slides.length - 1 ? (
          <>
            {/* <Text
              onPress={() => router.push("/auth/login")}
              style={{ color: "gray" }}
            >
              Skip
            </Text> */}
            <Text onPress={handleFinish} style={{ color: "gray" }}>
              Skip
            </Text>
            <Text onPress={handleNext} style={{ color: "#16A8E3" }}>
              Next
            </Text>
          </>
        ) : null}
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      {/* Pagination Dots at bottom */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 50,
        }}
      >
        {slides.map((_, i) => (
          <View
            key={i}
            style={{
              height: 8, // Height of the pill
              width: 34, // Width of the pill
              margin: 5,
              borderRadius: 4, // Makes it a rounded pill
              borderWidth: 1, // Added border
              borderColor: "#16A8E3", // Blue border for everyone
              // If active: blue background. If inactive: transparent background
              backgroundColor: currentIndex === i ? "#16A8E3" : "transparent",
            }}
          />
        ))}
      </View>
    </View>
  );
}
