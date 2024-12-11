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

export default function SignUp() {
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

  // Handle signup process
  const handleSignUp = async () => {
    // Field validations
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert('Error', 'Both email and password are required!');
      return;
    }

    if (!trimmedEmail.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (trimmedPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      // Signup with Supabase
      const { error } = await supabaseauth.auth.signUp({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      setLoading(false);

      if (error) {
        Alert.alert('Signup Failed', error.message);
        return;
      }

      Alert.alert('Success', 'Account created successfully! Please log in.');
      router.push('/explore'); // Navigate to explore screen
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error(err);
    }
  };

  // Common styles
  const inputStyle = tailwind`p-4 bg-gray-700 border border-gray-500 rounded-2xl mb-3 text-white`;
  const buttonStyle = tailwind`py-3 bg-yellow-400 rounded-xl`;
  const buttonTextStyle = tailwind`text-xl font-bold text-center text-gray-700`;

  return (
    <View style={[tailwind`flex-1`, { backgroundColor: '#6C6AB1' }]}>
      <SafeAreaView style={tailwind`flex`}>
        {/* Header Row */}
        <View style={tailwind`flex-row items-center justify-between px-4 mt-4`}>
          <TouchableOpacity
            onPress={() => router.push('/explore')}
            style={tailwind`bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl`}
            accessibilityLabel="Back to explore screen"
          >
            <ArrowLeftIcon size={20} color={'black'} />
          </TouchableOpacity>
          <Text style={tailwind`text-4xl font-bold text-white`}>Sign Up</Text>
          <View style={tailwind`w-12`} />
        </View>

        {/* Logo and Subtitle */}
        <View style={tailwind`flex-row justify-center mt-8`}>
          <Animated.View style={[tailwind`items-center`, titleStyle]}>
            <Text style={tailwind`text-sm text-white mt-2`}>
              Enter your email and password to create an account
            </Text>
            <Image
              source={require('../../assets/images/react-logo.png')}
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
          style={inputStyle}
          placeholder="Enter Email"
          placeholderTextColor="lightgray"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          accessibilityLabel="Enter your email address"
        />

        {/* Password Input */}
        <Text style={tailwind`text-gray-700 ml-4`}>Password</Text>
        <TextInput
          style={inputStyle}
          secureTextEntry
          placeholder="Enter Password"
          placeholderTextColor="lightgray"
          value={password}
          onChangeText={setPassword}
          accessibilityLabel="Enter your password"
        />

        {/* Sign Up Button */}
        <TouchableOpacity
          style={buttonStyle}
          onPress={handleSignUp}
          accessibilityLabel="Create an account"
        >
          <Text style={buttonTextStyle}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
