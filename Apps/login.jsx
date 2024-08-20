import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const Login = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Main');
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <LinearGradient
      colors={['#2b189e', '#5d4add', '#a38ef9']}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')} 
          style={styles.logo}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <FontAwesome name="home" size={24} color="white" />
        <Text style={styles.buttonText}>Login with BEYOND⁺</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <FontAwesome name="google" size={24} color="white" />
        <Text style={styles.buttonText}>Login with Google  </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <AntDesign name="apple1" size={24} color="white" />
        <Text style={styles.buttonText}>Login with Apple   </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 180,
    height: 110,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7B68EE',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
  signInButton: {
    marginTop: 20,
  },
  signInText: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline',
  },
});

export default Login;
