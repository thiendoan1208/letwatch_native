import { ImageRoute } from "@/data/image_routes";
import * as React from "react";
import { Dimensions, Image, ImageStyle, StyleProp, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

function CustomCarousel({
  items,
  styles,
}: {
  items: ImageRoute[];
  styles: StyleProp<ImageStyle>;
}) {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        width={width}
        style={{ width, height: width / 4 }}
        data={items}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <View
            key={item.key}
            style={{
              flex: 1,
            }}
          >
            <Image
              style={styles}
              source={item.src}
            />
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={items}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
}

export default CustomCarousel;
