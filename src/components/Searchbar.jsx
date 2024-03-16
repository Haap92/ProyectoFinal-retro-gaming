import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../global/colors.js"

const Searchbar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (text) => {
    setInput(text);
    onSearch(text); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={handleInputChange} 
          placeholder="Search product..."
        />
      </View>
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60, 
    backgroundColor: colors.grayScale1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    fontSize: 20,
    color: colors.mustard0,
    backgroundColor: colors.grayScale2,
  }
});