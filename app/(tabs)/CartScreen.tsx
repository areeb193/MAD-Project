import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import Animated,{ FadeIn } from "react-native-reanimated";
import CartListItem from "../../components/CartListItem"; // Make sure to import your CartListItem component
import Button from "../../components/Button"; // Make sure to import your Button component
import { useCart } from '../../Provider/CartProvider';


// Define the shape of the cart item
interface CartItem {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  size: string; // Add the size property
}

const CartScreen = () => {
  const { items, total } = useCart(); // Fetch cart items and total from the cart context
  const router = useRouter(); // Correctly initialize useRouter
  
  const [promoCode, setPromoCode] = useState(''); // State for entered promo code
  const [discount, setDiscount] = useState(0); // State for applied discount
  
  const promoCodes: { [key: string]: number } = {
    SAVE10: 10, // 10% discount
    SAVE20: 20,
    SAVE30: 30,
    SAVE40: 40,
    NEWUSER: 50
    
     // 20% discount
  };
  
  const applyPromoCode = () => {
    if (promoCodes[promoCode]) {
      setDiscount(promoCodes[promoCode]);
    } else {
      setDiscount(0);
      alert('Invalid Promo Code');
    }
  };

  const discountedTotal = total - (total * discount) / 100;

  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(1000)}>
      <TouchableOpacity
        onPress={() => router.push('/HomeScreen')} // Updated navigation path
        style={styles.backButton}
        accessibilityLabel="Back to home screen"
      >
        <ArrowLeftIcon size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Your Cart</Text>
      <Text style={styles.itemCount}>Items in Cart: {items.length}</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        keyExtractor={(item) => item.product.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <Text style={styles.total}>Total: ${discountedTotal.toFixed(2)}</Text>
      
      <View style={styles.promoContainer}>
        <TextInput
          style={styles.promoInput}
          placeholder="Enter Promo Code"
          value={promoCode}
          onChangeText={setPromoCode}
        />
        <Button text="Apply" onPress={applyPromoCode} />
      </View>
      <Button text="Checkout" onPress={() => router.push('/Checkout')} />

    
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemCount: {
    fontSize: 16,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  promoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default CartScreen;