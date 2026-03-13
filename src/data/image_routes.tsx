import { ImageSourcePropType } from "react-native";

export type ImageRoute = {
  key: number;
  name: string;
  src: ImageSourcePropType;
};

export const BANNER_IMAGE_ROUTES: ImageRoute[] = [
  {
    key: 1,
    name: "Banner 1",
    src: require("@/assets/banner/bn1.jpg"),
  },
  {
    key: 2,
    name: "Banner 2",
    src: require("@/assets/banner/bn2.jpg"),
  },
  {
    key: 3,
    name: "Banner 3",
    src: require("@/assets/banner/bn3.jpg"),
  },
];

export const ICON_IMAGE_ROUTES: ImageRoute[] = [
  {
    key: 1,
    name: "Hot Deal",
    src: require("@/assets/icons/flash-deals.png"),
  },
  {
    key: 2,
    name: "Quán Ngon",
    src: require("@/assets/icons/nice-shop.png"),
  },
  { key: 3, name: "Tích Điểm", src: require("@/assets/icons/points.png") },
  { key: 4, name: "Ngọt Xỉu", src: require("@/assets/icons/rice.png") },
  {
    key: 5,
    name: "Quán Tiền Bối",
    src: require("@/assets/icons/noodles.png"),
  },
  {
    key: 6,
    name: "Bún, Mì, Phở",
    src: require("@/assets/icons/bun-pho.png"),
  },
  { key: 7, name: "BBQ", src: require("@/assets/icons/bbq.png") },
  { key: 8, name: "Fast Food", src: require("@/assets/icons/fastfood.png") },
  { key: 9, name: "Pizza", src: require("@/assets/icons/Pizza.png") },
  { key: 10, name: "Burger", src: require("@/assets/icons/burger.png") },
  {
    key: 11,
    name: "Sống Khỏe",
    src: require("@/assets/icons/egg-cucmber.png"),
  },
  { key: 12, name: "Giảm 50k", src: require("@/assets/icons/moi-moi.png") },
  {
    key: 13,
    name: "99k Off",
    src: require("@/assets/icons/fried-chicken.png"),
  },
  {
    key: 14,
    name: "No Bụng",
    src: require("@/assets/icons/korean-food.png"),
  },
  { key: 15, name: "Freeship", src: require("@/assets/icons/Steak.png") },
  { key: 16, name: "Deal 0Đ", src: require("@/assets/icons/tomato.png") },
  { key: 17, name: "Món 1Đ", src: require("@/assets/icons/elipse.png") },
  { key: 18, name: "Ăn chiều", src: require("@/assets/icons/chowmein.png") },
  { key: 19, name: "Combo 199k", src: require("@/assets/icons/Notif.png") },
  { key: 20, name: "Milk Tea", src: require("@/assets/icons/salad.png") },
];
