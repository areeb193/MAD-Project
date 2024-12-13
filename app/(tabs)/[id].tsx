import React, { useState } from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import tailwind from "twrnc";
import products from "../../data/data";
import { useRouter } from "expo-router";
import { useCart } from "../Provider/CartProvider"; // Import the useCart hook

const DetailScreen = () => {
  const { id } = useLocalSearchParams();
  console.log(id); // Log to check if id is fetched correctly

  // Find the product matching the id
  const shoe = products.find((p) => p.id.toString() === id);
  console.log(shoe); // Log the shoe object to see if it's found

  const [selectedSize, setSelectedSize] = useState<string | null>(null); // Specify the type of selectedSize
  const sizes = ["6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"];
  
  const { addItem } = useCart(); // Get the addToCart function from context
  const router = useRouter(); // Navigation hook to navigate to CartScreen

  if (!shoe) {
    return <Text style={tailwind`text-center text-red-500`}>Shoe not found</Text>;
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      const product = {
        id: shoe.id.toString(),
        title: shoe.title,
        price: shoe.price,
        pic: shoe.pic,
        image: shoe.pic, // Assuming shoe.pic is used for the image as well
        name: shoe.title, // Assuming shoe.title is used for the name as well
      };
      addItem(product, selectedSize); // Pass both product and size
      router.push("/CartScreen"); // Use navigate instead of push
    } else {
      alert("Please select a size");
    }
  };

  return (
    <ScrollView style={tailwind`flex-1 bg-white`}>
      {/* Product Image */}
      <View style={tailwind`items-center mt-6 mb-4`}>
        <Image
          source={{ uri: shoe.pic }}
          style={tailwind`w-64 h-64 rounded-lg shadow-lg`}
          resizeMode="contain"
        />
      </View>

      {/* Title and Price */}
      <View style={tailwind`px-6`}>
        <Text style={tailwind`text-3xl font-bold mb-2`}>{shoe.title}</Text>
        <Text style={tailwind`text-gray-600 text-lg`}>Men's Shoes</Text>
        <Text style={tailwind`text-black text-2xl font-bold mt-1`}>${shoe.price}</Text>
      </View>

      {/* Description */}
      <View style={tailwind`px-6 mt-4`}>
        <Text style={tailwind`text-gray-500`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis non, eu odio enim.
          Placera dolor sit ex enim. Nam elementum felis aliquet felis ipsum ex amet.
        </Text>
      </View>

      {/* Size Selector */}
      <View style={tailwind`px-6 mt-4`}>
        <Text style={tailwind`font-semibold text-lg mb-2`}>Select Size:</Text>
        <View style={tailwind`flex-row flex-wrap`}>
          {sizes.map((size) => (
            <Pressable
              key={size}
              onPress={() => setSelectedSize(size)} // Correctly update selectedSize
              style={[
                tailwind`p-2 m-1 border rounded-lg`,
                selectedSize === size
                  ? tailwind`border-black bg-gray-200` // Highlight selected size
                  : tailwind`border-gray-300`,
              ]}
            >
              <Text style={tailwind`text-sm font-semibold`}>{size}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={tailwind`px-6 flex-row justify-between mt-6 mb-6`}>
        <Pressable style={tailwind`flex-1 bg-black py-3 mr-2 rounded-lg`}>
          <Text style={tailwind`text-white text-center font-bold`}>BUY NOW</Text>
        </Pressable>
        <Pressable style={tailwind`flex-1 bg-gray-700 py-3 ml-2 rounded-lg`} onPress={handleAddToCart}>
          <Text style={tailwind`text-white text-center font-bold`}>ADD TO CART</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
