import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Resume = () => {
    const navigation = useNavigation();
    
    const handleReview = () => {
        navigation.navigate('Review');
      };
      const handleMain = () => {
        navigation.navigate('Main');
      };
      const handleAccount = () => {
        navigation.navigate('Account');
      };


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Resume Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default Resume;
