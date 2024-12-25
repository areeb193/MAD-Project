import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import tailwind from 'twrnc';

// Initialize Supabase client
const supabaseUrl = 'https://slbdztvvoyiwtrjwjqck.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsYmR6dHZ2b3lpd3RyandqcWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyOTg4NTcsImV4cCI6MjA0ODg3NDg1N30.zZ1KDOZzynyRIPizu5zlCkciyESCR2wPi-9AkhKr_6Q';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Define the shape of the order item
interface Order {
  id: number;
  Product: string; // This will be parsed as JSON
  OrderStatus: boolean;
  User: string;
  Number: string;
}

interface Product {
  id: number;
  name: string;
  quantity: number;
  size: string;
}

const TrackOrder = () => {
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orders, setOrders] = useState<Order[]>([]); // Define the type of orders
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Orders')
      .select('*')
      .eq('User', userName)
      .eq('Number', phoneNumber);

    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data as Order[]); // Cast the data to the Order type
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Track Your Order</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={fetchOrders}>
        <Text style={styles.buttonText}>Track Order</Text>
      </TouchableOpacity>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const products: Product[] = JSON.parse(item.Product);
            return (
              <View style={styles.orderCard}>
                {products.map((product) => (
                  <View key={`${item.id}-${product.id}`} style={styles.productContainer}>
                    <Image source={{ uri: 'https://via.placeholder.com/60' }} style={styles.productImage} />
                    <View style={styles.orderDetails}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productQuantity}>Quantity: {product.quantity}</Text>
                      <Text style={styles.productSize}>Size: {product.size}</Text>
                      <Text style={styles.orderStatus}>
                        Status: {item.OrderStatus ? 'Delivered' : 'Pending'}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  orderDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productQuantity: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  productSize: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  orderStatus: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default TrackOrder;