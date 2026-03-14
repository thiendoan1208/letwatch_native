import AppProvider from "@/context/user_context";
import { Stack } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";

function LayoutPage() {
  return (
    <AppProvider>
      <RootSiblingParent>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="(auth)/signup"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="(auth)/signin"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="(main)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </RootSiblingParent>
    </AppProvider>
  );
}

export default LayoutPage;
