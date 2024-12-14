import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '../Provider/CartProvider';
import Button from '../../components/Button';
import CartListItem from '../../components/CartListItem';
import Animated, { FadeIn } from 'react-native-reanimated';

const CartScreen = () => {
  const { items, total } = useCart(); // Fetch cart items and total from the cart context

  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(1000)}>
      <Text style={styles.header}>Your Cart</Text>
      <Text style={styles.itemCount}>Items in Cart: {items.length}</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.listContainer}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      <Button text="Checkout" onPress={() => {/* Add checkout functionality here */}} />
      <StatusBar style="auto" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#343a40',
    textAlign: 'center',
  },
  itemCount: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#495057',
    textAlign: 'center',
  },
  listContainer: {
    gap: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default CartScreen;
