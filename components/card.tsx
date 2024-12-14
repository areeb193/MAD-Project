import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import tailwind from "twrnc";
import { HeartIcon } from "react-native-heroicons/outline"; // Import the heart icon

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

const Card: React.FC<CardProps> = ({ item, onPress }) => {
  // State to track if the item is favorited
  const [isFavorited, setIsFavorited] = useState(false);

  // Toggle favorite state
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

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

      {/* Heart Icon for favorite */}
      <Pressable onPress={toggleFavorite} style={styles.heartContainer}>
        <HeartIcon
          size={24}
          color={isFavorited ? "red" : "gray"} // Change color based on favorite state
        />
      </Pressable>
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
    padding: 15,
    marginBottom: 15,
    width: 180,
    position: "relative", // Position the heart icon at the bottom right
  },
  image: {
    width: "100%",
    height: 130,
    borderRadius: 8,
    marginBottom: 8,
  },
  heartContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
});

export default Card;
