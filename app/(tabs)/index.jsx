import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import tailwind from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useRouter } from 'expo-router'; // Use Expo Router's navigation hook

const Index = () => {
  // Shared values for the paddings
  const ring1padding = useSharedValue(hp(5));  // Initial padding for the first ring
  const ring2padding = useSharedValue(hp(5.5)); // Initial padding for the second ring
  const router = useRouter();

  // Apply animation in useEffect
  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    
    setTimeout(() => {
      // Animate the first ring padding
      ring1padding.value = withSpring(hp(10)); // Use withSpring to animate
    }, 100);

    setTimeout(() => {
      // Animate the second ring padding
      ring2padding.value = withSpring(hp(11)); // Use withSpring to animate
    }, 300);

    // Delay navigation by 2.5 seconds
    setTimeout(() => {
      router.push('/explore'); // Navigate using Expo Router
    }, 2500);
  }, [router]);

  return (
    <View style={tailwind`flex-1 justify-center items-center bg-amber-500`}>
      <StatusBar style="light" />

      {/* Outer ring for the image with animated padding */}
      <Animated.View style={[tailwind`bg-white/20 rounded-full mb-12`, { padding: ring2padding }]}>
        <Animated.View style={[tailwind`bg-white/20 rounded-full`, { padding: ring1padding }]}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      {/* Text container with spacing */}
      <View style={tailwind`items-center mt-8`}>
        <Text style={[tailwind`font-bold text-white mb-4`, { fontSize: hp(7) }]}>
        StrideZone
        </Text>
        <Text style={[tailwind`text-white`, { fontSize: hp(2) }]}>
          Right for You
        </Text>
      </View>
    </View>
  );
};

export default Index;
