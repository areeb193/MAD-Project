import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Animated, Alert, ActivityIndicator } from "react-native";
import tailwind from "twrnc";

// Define the type for a product
interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  category: string;
}

const TrendingShoesSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Animation for the touch effect
  const scaleValue = useState(new Animated.Value(1))[0];

  const animateScale = (toValue: number) => {
    Animated.spring(scaleValue, {
      toValue,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  // Handle the press event and show "Coming Soon"
  const handlePress = () => {
    Alert.alert("Coming Soon", "This product will be available soon. Stay tuned!");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await response.json();
        setProducts(data.filter((item) => item.category.includes("men's clothing")));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={tailwind`px-4 py-6 items-center`}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={tailwind`text-gray-500 mt-2`}>Loading Upcoming Products...</Text>
      </View>
    );
  }

  return (
    <View style={tailwind`px-4 mb-6`}>
      <Text style={tailwind`text-lg font-bold text-gray-800 mb-4`}>Upcoming Products</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map(({ id, image, title, price }) => (
          <TouchableOpacity
            key={id}
            style={[
              tailwind`bg-white rounded-xl mr-4 shadow-lg p-4 justify-between items-center`,
              { width: 120, height: 160 },
            ]}
            activeOpacity={0.7}
            onPressIn={() => animateScale(1.1)} // Scale up on press
            onPressOut={() => animateScale(1)} // Scale back down
            onPress={handlePress} // Show "Coming Soon" message
          >
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Image
                source={{ uri: image }}
                style={tailwind`h-24 w-24 rounded-lg`}
                resizeMode="contain"
              />
              <Text
                style={tailwind`text-sm font-semibold text-gray-700 mt-2 text-center`}
                numberOfLines={1}
              >
                {title}
              </Text>
              <Text style={tailwind`text-xs font-medium text-gray-500 mt-1`}>${price.toFixed(2)}</Text>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TrendingShoesSection;
