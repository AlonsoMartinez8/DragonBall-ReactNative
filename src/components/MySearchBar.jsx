import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";

const ww = Dimensions.get("window").width;

export default function MySearchBar({ onSearchChange }) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (s) => {
    setSearch(s);
  };

  useEffect(() => {
    onSearchChange(search);
  }, [search]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchbar}
        placeholder="Search"
        onChangeText={handleSearchChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#ddd4",
    width: ww,
  },
  searchbar: {
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
});
