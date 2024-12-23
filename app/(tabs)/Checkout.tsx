import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import Button from "../../components/Button";
import { useCart } from "../../Provider/CartProvider";
import { supabaseauth } from "../../lib/supabaseauth";
import CartListItem from "../../components/CartListItem";
import { useRouter } from "expo-router";

const CheckoutScreen = () => {
  const { items, total, clearCart } = useCart();
  const router = useRouter(); // Initialize router for navigation
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleOrderSubmit = async () => {
    const orderData = {
      User: userName,
      Product: JSON.stringify(
        items.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          size: item.size,
        }))
      ),
      Number: phoneNumber,
      Address: address,
      OrderStatus: false, // Set OrderStatus to false as a boolean
    };

    try {
      const { data, error } = await supabaseauth.from("Orders").insert([orderData]).select();

      if (error) {
        console.error("Order submission failed:", error);
        alert("Failed to place the order.");
      } else {
        alert("Order placed successfully!");
        clearCart();

        // Navigate to HomeScreen after 2 seconds
        setTimeout(() => {
          router.push("/HomeScreen");
        }, 2000);
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        keyExtractor={(item) => item.product.id.toString()}
        style={styles.cartList}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <Button text="Place Order" onPress={handleOrderSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cartList: {
    marginBottom: 16,
  },
  cartItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});

export default CheckoutScreen;
