import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, TextInput, Image, ScrollView, Dimensions, TouchableOpacity, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MapPinIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { Link } from "expo-router"; // Import Link for navigation
import tailwind from "twrnc";
import { useRouter } from "expo-router";

import Card from "../../components/card";
import TrendingSection from '../../components/TrendingShoesSection'; // Import your Card component

const { width } = Dimensions.get("window");
const apiUrl = 'https://slbdztvvoyiwtrjwjqck.supabase.co/rest/v1/Semester?select=*';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsYmR6dHZ2b3lpd3RyandqcWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyOTg4NTcsImV4cCI6MjA0ODg3NDg1N30.zZ1KDOZzynyRIPizu5zlCkciyESCR2wPi-9AkhKr_6Q';

const HomeScreen = () => {
  const images = [
    require("../../assets/images/forest.png"),
    require("../../assets/images/sky.png"),
    require("../../assets/images/nature.png"),
  ];
  const [semesterData, setSemesterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  // Fetch semester data from the API
  const fetchSemesterData = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setSemesterData(data || []); // Set fetched data
      } else {
        console.error("Error fetching data:", data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSemesterData();
  }, []);

  // Automatically slide images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -200],
    extrapolate: "clamp",
  });

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StatusBar hidden={true} />

      <Animated.View
        style={[tailwind`absolute top-0 left-0 right-0 z-10 bg-white`, { transform: [{ translateY: headerTranslate }] }]}
      >
        {/* Header and Welcome Text */}
        <View style={tailwind`px-4 mb-4`}>
          <View style={tailwind`flex-row justify-between items-center mb-4`}>
            <Image
              source={require("../../assets/images/react-logo.png")}
              style={{ height: hp(5), width: hp(5.5) }}
            />
             
          <TouchableOpacity onPress={() => router.push('/TrackOrder')}>
            <MapPinIcon size={hp(4)} color="gray" />
          </TouchableOpacity>
        
          </View>

          <Text style={[tailwind`text-neutral-600`, { fontSize: hp(1.7) }]}>Hello!</Text>
          <Text style={[tailwind`font-semibold text-neutral-600`, { fontSize: hp(3.8) }]}>
            Find your perfect Accessories, shop from <Text style={tailwind`text-amber-400`}>here</Text>
          </Text>
        </View>

        {/* Search Bar */}
        <View style={tailwind`px-4 mb-4`}>
          <TouchableOpacity
            onPress={() => {
              // Navigate to the Search Screen
              router.push("/Search");
            }}
            style={tailwind`flex-row items-center rounded-full bg-black/5 p-[6px]`}
          >
            <TextInput
              placeholder="Search for Product"
              placeholderTextColor="gray"
              editable={false} // Prevent editing here
              style={[tailwind`flex-1 text-base tracking-wider pl-3`, { fontSize: hp(1.7) }]}
            />
            <View style={tailwind`bg-white rounded-full p-3`}>
              <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Image Slider */}
        <View style={{ height: 150, marginBottom: 16 }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ width }}
            onScroll={(event) => {
              const scrollPosition = event.nativeEvent.contentOffset.x;
              const currentIndex = Math.round(scrollPosition / width);
              setActiveIndex(currentIndex);
            }}
            scrollEventThrottle={16}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                source={image}
                style={{ width: width - 20, height: 150, borderRadius: 10, marginHorizontal: 10 }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <View style={tailwind`flex-row justify-center mt-2`}>
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginHorizontal: 4,
                  backgroundColor: activeIndex === index ? "#FFEE58" : "#90A4AE",
                }}
              />
            ))}
          </View>
        </View>

        {/* Trending Shoes Section */}
        <View style={tailwind`px-1 mb-1`}>
          <TrendingSection />
        </View>
      </Animated.View>

      {/* Product List */}
      <Animated.FlatList
        data={semesterData}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => (
          <Link href={`/${item.id}`} asChild>
            {/* Wrap Card with Link */}
            <Card
              item={{
                title: item.Title,
                pic: item.pic,
                size: item.size || "N/A",
                price: item.Price || "N/A",
              }}
              onPress={() => {
                console.log(`Navigating to details of: ${item.title}`);
              }}
            />
          </Link>
        )}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, paddingTop: 650 }}
        columnWrapperStyle={{ gap: 10, justifyContent: "space-between" }} // Ensure proper spacing
        ListEmptyComponent={
          <View style={tailwind`flex-1 justify-center items-center`}>
            <Text style={tailwind`text-gray-500`}>No shoes available.</Text>
          </View>
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />
    </View>
  );
};

export default HomeScreen; 