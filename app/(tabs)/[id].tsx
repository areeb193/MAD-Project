import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import tailwind from "twrnc";
import { useRouter } from "expo-router";
import { useCart } from "../../Provider/CartProvider";

const apiUrl = "https://slbdztvvoyiwtrjwjqck.supabase.co/rest/v1/Semester";
const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsYmR6dHZ2b3lpd3RyandqcWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyOTg4NTcsImV4cCI6MjA0ODg3NDg1N30.zZ1KDOZzynyRIPizu5zlCkciyESCR2wPi-9AkhKr_6Q";

interface Shoe {
  id: string;
  Title: string;
  Price: number;
  pic: string;
}

const DetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [shoe, setShoe] = useState<Shoe | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = ["6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"];
  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchShoeData = async () => {
      try {
        const response = await fetch(`${apiUrl}?id=eq.${id}`, {
          method: "GET",
          headers: {
            apikey: anonKey,
            Authorization: `Bearer ${anonKey}`,
            "Content-Type": "application/json",
          },
        });
        const data: Shoe[] = await response.json();
        if (response.ok && data.length > 0) {
          setShoe(data[0]);
        } else {
          console.error("Shoe not found or error fetching data.");
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShoeData();
  }, [id]);

  const handleAddToCart = () => {
    if (selectedSize) {
      addItem(
        {
          id: shoe!.id,
          
          price: shoe!.Price,
          image: shoe!.pic,
          name: shoe!.Title,
        },
        selectedSize
      );
      router.push("/CartScreen");
    } else {
      alert("Please select a size");
    }
  };

  if (loading) {
    return (
      <View style={tailwind`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!shoe) {
    return <Text style={tailwind`text-center text-red-500`}>Shoe not found</Text>;
  }

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
        <Text style={tailwind`text-3xl font-bold mb-2`}>{shoe.Title}</Text>
        <Text style={tailwind`text-gray-600 text-lg`}>Men's Shoes</Text>
        <Text style={tailwind`text-black text-2xl font-bold mt-1`}>${shoe.Price}</Text>
      </View>

      {/* Description */}
      <View style={tailwind`px-6 mt-4`}>
        <Text style={tailwind`text-gray-500`}>
          High-quality shoes that combine comfort and durability, perfect for any occasion.
        </Text>
      </View>

      {/* Size Selector */}
      <View style={tailwind`px-6 mt-4`}>
        <Text style={tailwind`font-semibold text-lg mb-2`}>Select Size:</Text>
        <View style={tailwind`flex-row flex-wrap`}>
          {sizes.map((size) => (
            <Pressable
              key={size}
              onPress={() => setSelectedSize(size)}
              style={[
                tailwind`p-2 m-1 border rounded-lg`,
                selectedSize === size
                  ? tailwind`border-black bg-gray-200`
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
        <Pressable
          style={tailwind`flex-1 bg-gray-700 py-3 ml-2 rounded-lg`}
          onPress={handleAddToCart}
        >
          <Text style={tailwind`text-white text-center font-bold`}>ADD TO CART</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
