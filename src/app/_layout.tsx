import { Stack } from "expo-router";

function LayoutPage() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default LayoutPage;
