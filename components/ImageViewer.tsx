import { StyleSheet } from "react-native";
import { Image } from "react-native";

type Props = {
  imgSource: string;
};

export default function ImageViewer({ imgSource }: Props) {
  return <Image source={imgSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 300,
    borderRadius: 18,
  },
});
