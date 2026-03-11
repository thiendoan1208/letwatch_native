import { Tabs } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";

function LayoutPage() {
  return (
    <RootSiblingParent>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
          }}
        />
      </Tabs>
    </RootSiblingParent>
  );
}

export default LayoutPage;
