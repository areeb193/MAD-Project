import React from "react";
import { View, Text, Image, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import tailwind from "twrnc";
import products from "../../data/data";

const DetailScreen = () => {
  const { id } = useLocalSearchParams();
  const shoe = products.find((p) => p.id.toString() === id);

  if (!shoe) {
    return <Text style={tailwind`text-center`}>Shoe not found</Text>;
  }

  return (
    <View style={tailwind`flex-1 p-4`}>
      <Image
        source={{ uri: shoe.pic }}
        style={tailwind`w-full h-60 rounded-lg mb-4`}
        resizeMode="contain"
      />
      <Text style={tailwind`font-bold text-2xl`}>{shoe.title}</Text>
      <Text style={tailwind`text-gray-500`}>Size: {shoe.size}</Text>
      <Text style={tailwind`text-amber-400 font-semibold`}>${shoe.price}</Text>
      <Button title="Add to Cart" onPress={() => { /* handle adding to cart */ }} />
    </View>
  );
};

export default DetailScreen;
