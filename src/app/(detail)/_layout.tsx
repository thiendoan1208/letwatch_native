import { Stack } from "expo-router";

function LayoutPage() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="film_detail"
        options={{
          headerTitle: "Film",
        }}
      />
    </Stack>
  );
}

export default LayoutPage;
