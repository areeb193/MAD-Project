import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useRouter } from 'expo-router';
import tailwind from 'twrnc';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { supabaseauth } from '@/lib/supabaseauth';




export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Animation values
  const titleOpacity = useSharedValue(0);
  const formTranslation = useSharedValue(50);
  const formOpacity = useSharedValue(0);

  useEffect(() => {
    // Trigger animations on component mount
    titleOpacity.value = withTiming(1, { duration: 1000 });
    formTranslation.value = withTiming(0, { duration: 1000 });
    formOpacity.value = withTiming(1, { duration: 1000 });
  }, []);

  // Animated styles
  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }));

  const formStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: formTranslation.value }],
    opacity: formOpacity.value,
  }));

  // Handle login process
  const handleLogin = async () => {
    // Field validations
    if (!email || !password) {
      Alert.alert('Error', 'Both email and password are required!');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      // Login with Supabase
      const { data, error } = await supabaseauth.auth.signInWithPassword({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        Alert.alert('Login Failed', error.message);
        return;
      }

      if (data.session) {
        Alert.alert('Success', 'Login successful!');
        router.push('/HomeScreen'); // Navigate to HomeScreen
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error(err);
    }
  };

  return (
    <View style={[tailwind`flex-1`, { backgroundColor: '#6C6AB1' }]}>
      <SafeAreaView style={tailwind`flex`}>
        {/* Header Row */}
        <View style={tailwind`flex-row items-center justify-between px-4 mt-4`}>
          <TouchableOpacity
            onPress={() => router.push('/explore')}
            style={tailwind`bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl`}
          >
            <ArrowLeftIcon size={20} color={'black'} />
          </TouchableOpacity>
          <Text style={tailwind`text-4xl font-bold text-white`}>Login</Text>
          <View style={tailwind`w-12`} />
        </View>

        {/* Logo and Subtitle */}
        <View style={tailwind`flex-row justify-center mt-8`}>
          <Animated.View style={[tailwind`items-center`, titleStyle]}>
            <Text style={tailwind`text-sm text-white mt-2`}>
              Enter your valid email and password
            </Text>
            <Image
              source={require('../../assets/images/logo.png')}
              style={{ width: hp(20), height: hp(20) }}
            />
          </Animated.View>
        </View>
      </SafeAreaView>

      {/* Form */}
      <Animated.View
        style={[
          tailwind`flex-1 bg-white px-8 pt-8`,
          { borderTopLeftRadius: 50, borderTopRightRadius: 50 },
          formStyle,
        ]}
      >
        {/* Email Input */}
        <Text style={tailwind`text-gray-700 ml-4`}>Email Address</Text>
        <TextInput
          style={tailwind`p-4 bg-gray-700 border border-gray-500 rounded-2xl mb-3 text-white`}
          placeholder="Enter Email"
          placeholderTextColor="lightgray"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <Text style={tailwind`text-gray-700 ml-4`}>Password</Text>
        <TextInput
          style={tailwind`p-4 bg-gray-700 border border-gray-500 rounded-2xl mb-3 text-white`}
          secureTextEntry
          placeholder="Enter Password"
          placeholderTextColor="lightgray"
          value={password}
          onChangeText={setPassword}
        />

        {/* Login Button */}
        <TouchableOpacity
          style={tailwind`py-3 bg-yellow-400 rounded-xl`}
          onPress={handleLogin}
        >
          <Text style={tailwind`text-xl font-bold text-center text-gray-700`}>
            {loading ? 'Logging In...' : 'Log In'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
