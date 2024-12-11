import React from "react";
import { View, Text, FlatList, TextInput, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { Link } from "expo-router"; // Import Link for navigation
import tailwind from "twrnc";
import shoes from "../../data/data";
import Card from "../../components/card"; // Import your Card component

const HomeScreen = () => {
  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StatusBar hidden={true} />

      {/* Header */}
      <View style={tailwind`px-4 flex-row justify-between items-center mb-4`}>
        <Image
          source={require("../../assets/images/react-logo.png")}
          style={{ height: hp(5), width: hp(5.5) }}
        />
        <BellIcon size={hp(4)} color="gray" />
      </View>

      {/* Welcome Text */}
      <View style={tailwind`px-4 mb-4`}>
        <Text style={[tailwind`text-neutral-600`, { fontSize: hp(1.7) }]}>Hello, Saad!</Text>
        <Text style={[tailwind`font-semibold text-neutral-600`, { fontSize: hp(3.8) }]}>
          Find your perfect shoes, shop from{" "}
          <Text style={tailwind`text-amber-400`}>here</Text>
        </Text>
      </View>

      {/* Search Bar */}
      <View style={tailwind`px-4 flex-row items-center rounded-full bg-black/5 p-[6px] mb-4`}>
        <TextInput
          placeholder="Search for shoes"
          placeholderTextColor="gray"
          style={[
            tailwind`flex-1 text-base tracking-wider pl-3`,
            { fontSize: hp(1.7) },
          ]}
        />
        <View style={tailwind`bg-white rounded-full p-3`}>
          <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
        </View>
      </View>

      {/* Product List */}
      <FlatList
        data={shoes}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => (
          <Link href={`/${item.id}`} asChild>
            {/* Wrap Card with Link */}
            <Card
              item={item}
              onPress={() => {
                console.log(`Navigating to details of: ${item.title}`);
              }}
            />
          </Link>
        )}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 20 }}
        columnWrapperStyle={{ gap: 10, justifyContent: "space-between" }} // Ensure proper spacing
        ListEmptyComponent={
          <View style={tailwind`flex-1 justify-center items-center`}>
            <Text style={tailwind`text-gray-500`}>No shoes available.</Text>
          </View>
        }
      />
    </View>
  );
};

export default HomeScreen;
