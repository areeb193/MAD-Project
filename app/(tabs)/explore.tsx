import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import LottieView from 'lottie-react-native';

import { useRouter } from 'expo-router'; // Using expo-router's useRouter for navigation

const Explore = () => {
  const router = useRouter(); // Get router object from expo-router

  return (
    <SafeAreaView style={tailwind`flex-1 bg-[#8E89E2]`}>
      {/* Main container for centering content */}
      <View style={tailwind`flex-1 justify-center items-center px-6`}>
        {/* Heading Text */}
        <Text style={tailwind`text-white font-bold text-4xl mb-6 text-center`}>
          Let's Get Started
        </Text>

        {/* Lottie animation for a playful touch */}
        {/* <LottieView
          source={require('../../assets/images/rocket.json')} // Adjust the path if needed
          autoPlay
          loop
          style={tailwind`w-96 h-96 mb-8`} // Adjusted size to be more visually fitting
        /> */}
        
        {/* Sign up button */}
        <TouchableOpacity
          onPress={() => router.push('/signup')} // Correct usage of router.push() to navigate
          style={tailwind`w-full py-3 bg-yellow-400 rounded-xl mb-4`}>
          <Text style={tailwind`text-xl font-bold text-center text-gray-700`}>
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Login suggestion text */}
        <View style={tailwind`flex-row justify-center items-center`}>
          <Text style={tailwind`text-white font-semibold`}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={tailwind`font-semibold text-yellow-400`}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Explore;
