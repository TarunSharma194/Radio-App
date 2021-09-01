import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RadioNavigator from './src/navigation/RadioNavigator';

const App = () => {
  return (
    <View style={styles.container}>
      <RadioNavigator />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;