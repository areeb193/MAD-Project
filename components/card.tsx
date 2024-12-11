import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import tailwind from "twrnc";

// Define the shape of the `item` prop
interface ShoeItem {
  id: string;
  title: string;
  pic: string;
  size: string;
  price: number;
}

// Define the props for the Card component
interface CardProps {
  item: ShoeItem;
  onPress: (item: ShoeItem) => void; // onPress is a function that takes an item
}

// Card component to display individual shoe items
const Card: React.FC<CardProps> = ({ item, onPress }) => {
  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress(item)} // Call onPress with the item
    >
      <Image
        source={{ uri: item.pic || "https://via.placeholder.com/150" }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={tailwind`font-bold text-lg text-black`}>{item.title}</Text>
      <Text style={tailwind`text-gray-500`}>Size: {item.size}</Text>
      <Text style={tailwind`font-semibold text-amber-400 mt-2`}>${item.price}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    padding: 10,
    marginBottom: 10,
    width: 150,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default Card;
