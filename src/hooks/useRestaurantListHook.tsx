// ./hooks/useRestaurantListHook.ts
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from "react-native";

type ICustomFlatListStyles = {
  stickyElement: StyleProp<ViewStyle>;
  topListContainer: StyleProp<ViewStyle>;
};

type TUseCustomFlatListHook = [
  Animated.Value,
  ICustomFlatListStyles,
  (event: LayoutChangeEvent) => void,
  (event: LayoutChangeEvent) => void,
];

const window = Dimensions.get("window");

export const useCustomFlatListHook = (): TUseCustomFlatListHook => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [heights, setHeights] = useState({
    header: 0,
    sticky: 0,
  });

  const styles: ICustomFlatListStyles = {
    stickyElement: {
      left: 0,
      marginTop: heights.header, // <-- In order for the list to be under Header
      position: "absolute",
      right: 0,
      top: 0,
      transform: [
        {
          translateY: scrollY.interpolate({
            // <-- To move an element according to the scroll position
            extrapolate: "clamp",
            inputRange: [-window.height, heights.header],
            outputRange: [window.height, -heights.header],
          }),
        },
      ],
      zIndex: 2,
    },
    topListContainer: {
      marginTop: heights.sticky,
    },
  };

  const onLayoutHeaderElement = (event: LayoutChangeEvent): void => {
    setHeights({ ...heights, header: event.nativeEvent.layout.height });
  };

  const onLayoutTopStickyElement = (event: LayoutChangeEvent): void => {
    setHeights({ ...heights, sticky: event.nativeEvent.layout.height });
  };

  return [scrollY, styles, onLayoutHeaderElement, onLayoutTopStickyElement];
};
