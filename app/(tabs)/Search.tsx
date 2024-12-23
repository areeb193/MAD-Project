import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import { createClient } from "@supabase/supabase-js";
import { Link } from "expo-router";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  SlideInRight,
} from "react-native-reanimated";
import { ArrowLeftIcon } from 'react-native-heroicons/solid';

// Initialize Supabase client
const supabaseUrl = "https://slbdztvvoyiwtrjwjqck.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsYmR6dHZ2b3lpd3RyandqcWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyOTg4NTcsImV4cCI6MjA0ODg3NDg1N30.zZ1KDOZzynyRIPizu5zlCkciyESCR2wPi-9AkhKr_6Q";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type ProductType = {
  id: number;
  pic: string;
  Title?: string;
  Price: number;
};

const Search = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const router = useRouter(); // Initialize the router for navigation

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("Semester").select("*");

        if (error) {
          console.error("Error fetching products:", error);
          return;
        }

        if (data) {
          const sanitizedData = data.map((product: ProductType) => ({
            ...product,
            Title: product.Title || "Unnamed Product",
          }));
          setAllProducts(sanitizedData);
        }
      } catch (err) {
        console.error("Unexpected error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);

    if (text === "") {
      setFilteredProducts([]); // Clear the filtered product list if the search field is empty
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.Title?.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.push('/HomeScreen')} // Navigation on back button click
        style={styles.backButton}
        accessibilityLabel="Back to home screen"
      >
        <ArrowLeftIcon size={20} color="black" />
      </TouchableOpacity>

      {/* Search Bar */}
      <TextInput
        value={searchText}
        onChangeText={handleSearch}
        placeholder="Search for products..."
        placeholderTextColor="#888"
        style={styles.searchBar}
      />

      {/* Initial Message */}
      {searchText === "" && (
        <Animated.Text entering={FadeIn} style={styles.initialMessage}>
          Search for a product
        </Animated.Text>
      )}

      {/* Filtered Products */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(300 + index * 100).duration(500)} exiting={FadeOut}>
            <TouchableOpacity>
              <Link href={`/${item.id}`}>
                <View style={styles.productCard}>
                  <Image source={{ uri: item.pic }} style={styles.productImage} />
                  <View>
                    <Text style={styles.productTitle}>{item.Title}</Text>
                    <Text style={styles.productPrice}>${item.Price}</Text>
                  </View>
                </View>
              </Link>
            </TouchableOpacity>
          </Animated.View>
        )}
        ListEmptyComponent={
          searchText !== "" ? (
            <Animated.Text entering={FadeIn} style={styles.emptyMessage}>
              No products found.
            </Animated.Text>
          ) : null // Use null instead of false
        }
      />
    </View>
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
  searchBar: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  initialMessage: {
    fontSize: 18,
    textAlign: "center",
    color: "#aaa",
    marginTop: 20,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "#aaa",
    marginTop: 20,
  },
});

export default Search;