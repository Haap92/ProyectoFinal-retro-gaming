import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import { colors } from './../global/colors';

const CustomButton = ({ title, onPress }) => {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 100,
    maxWidth: 500,
    height: 50,
    backgroundColor: colors.mustard0, justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    margin: 10,

  },
  text: {
    fontSize: 18,
    color: "white",
    fontFamily: 'oswaldRegular',
    padding: 10 
  },
});

export default CustomButton;