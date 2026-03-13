import { useCustomFlatListHook } from "@/hooks/useRestaurantListHook";
import React, { JSX, useRef } from "react";
import { Animated, FlatListProps, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CustomFlatListProps<T> = Omit<FlatListProps<T>, "ListHeaderComponent"> & {
  /**
   * An element that is above all
   *
   * Hides when scrolling
   */
  HeaderComponent: JSX.Element;
  /**
   * An element that is above the list but lower than {@link CustomFlatListProps.HeaderComponent HeaderComponent} and has the property sticky
   *
   * When scrolling is fixed on top
   */
  StickyElementComponent: JSX.Element;
  /**
   * An element that is higher than the list but lower than {@link CustomFlatListProps.HeaderComponent HeaderComponent} and {@link CustomFlatListProps.StickyElementComponent StickyElementComponent}
   *
   * Hides when scrolling
   */
  TopListElementComponent: JSX.Element;
};

function CustomFlatList<T>({
  style,
  ...props
}: CustomFlatListProps<T>): React.ReactNode {
  const listRef = useRef<Animated.FlatList<T> | null>(null);

  const [
    scrollY,
    animatedStyles,
    onLayoutHeaderElement,
    onLayoutStickyElement,
  ] = useCustomFlatListHook();

  return (
    <SafeAreaView edges={["bottom"]} style={[layoutStyles.container, style]}>
      <Animated.View // <-- Sticky Component
        style={animatedStyles.stickyElement}
        onLayout={onLayoutStickyElement}
      >
        {props.StickyElementComponent}
      </Animated.View>

      <Animated.FlatList<any>
        ref={listRef}
        {...props}
        style={layoutStyles.list}
        ListHeaderComponent={
          <Animated.View>
            <Animated.View onLayout={onLayoutHeaderElement}>
              {props.HeaderComponent}
            </Animated.View>
            <Animated.View style={animatedStyles.topListContainer}>
              {props.TopListElementComponent}
            </Animated.View>
          </Animated.View>
        }
        ListHeaderComponentStyle={props.ListHeaderComponentStyle}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          },
        )}
      />
    </SafeAreaView>
  );
}

const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  list: {
    flex: 1,
  },
});

export default CustomFlatList;
