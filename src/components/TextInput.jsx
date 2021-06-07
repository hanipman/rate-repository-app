import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  defaultContainer: {
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    margin: 5
  },
  errorContainer: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    margin: 5
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = error ? styles.errorContainer : styles.defaultContainer;

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;