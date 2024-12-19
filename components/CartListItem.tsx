import React from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from '../Provider/CartProvider';

type CartListItemProps = {
  cartItem: { product: { id: string; image: string; name: string; price: number }; quantity: number; size: string };
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  const scaleAnim = new Animated.Value(1);

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1.05,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <Image source={{ uri: cartItem.product?.image }} style={styles.image} resizeMode="contain" />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{cartItem.product?.name || ' Product'}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>
            ${cartItem.product?.price ? cartItem.product.price.toFixed(2) : '0.00'}
          </Text>
          <Text>Size: {cartItem.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.product.id, -1)}
          name="minus"
          color="gray"
          style={{ padding: 5 }}
        />
        <Text style={styles.quantity}>{cartItem.quantity}</Text>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.product.id, 1)}
          name="plus"
          color="gray"
          style={{ padding: 5 }}
        />
        <FontAwesome
          onPress={() => removeItem(cartItem.product.id)}
          name="trash"
          color="red"
          style={{ padding: 5 }}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: 'center',
    marginRight: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default CartListItem;
