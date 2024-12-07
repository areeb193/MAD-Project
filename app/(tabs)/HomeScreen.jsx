import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useRouter } from 'expo-router';
import tailwind from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon } from 'react-native-heroicons/outline';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StatusBar style={tailwind`dark`} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        style={tailwind`space-y-6 pt-14`}
      >
        <View style={tailwind`mx-4 flex-row justify-between items-center mb-2`}>
          {/* Corrected Image Component */}
          <Image
            source={require('../../assets/images/react-logo.png')}
            style={{
              height: hp(5),
              width: hp(5.5),
            }}
          />
          {/* BellIcon */}
          <BellIcon size={hp(4)} color="gray" />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
