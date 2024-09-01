import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  const handleLogin = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  //구글 OAuth 모바일과 서버 사이 
  const google = () =>{
    const url = 'http://localhost:3000/auth/google';
    Linking.openURL(url);
    navigation.navigate('Main');
  };

  // const AuthScreen = ({ navigation }) => {

  //   useEffect(() => {
  //     const handleUrl = async (event) => {
  //       const { url } = event;
  //       console.log('Received URL:', url);
  
  //       if (url.startsWith('myapp://auth')) {
  //         const accessToken = new URL(url).searchParams.get('access_token');
  //         const refreshToken = new URL(url).searchParams.get('refresh_token');
          
  //         await AsyncStorage.setItem('accessToken', accessToken);
  //         await AsyncStorage.setItem('refreshToken', refreshToken);
  
  //         navigation.navigate('Home');
  //       }
  //     };
  
    //   // URL 리스너 설정
    //   Linking.addEventListener('url', handleUrl);
  
    //   // 리스너 해제
    //   return () => {
    //     Linking.removeEventListener('url', handleUrl);
    //   };
    // }, []);

  // const google = async () => {
  //   try {
  //     // 서버에서 Google OAuth URL을 가져오는 API 호출
  //     const response = await fetch('http://localhost:3000/auth/google');
  //     const { authUrl } = await response.json();
      
  //     // 브라우저에서 Google OAuth 페이지 열기
  //     Linking.openURL(authUrl);
  //   } catch (error) {
  //     console.error('Error during OAuth redirection:', error);
  //   }
  // };

  const handleSubmit = () => {
    if (email && password) {
      Alert.alert('Login', 'Logged in successfully!');
      setShowLoginForm(false); // Hide the form after successful login
      // Optionally navigate to the main screen
      navigation.navigate('Main');
    } else {
      Alert.alert('Error', 'Please enter both email and password.');
    }
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
      
      {/* Login with BEYOND⁺ button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <FontAwesome name="home" size={24} color="white" />
        <Text style={styles.buttonText}>Login with BEYOND⁺</Text>
      </TouchableOpacity>

      {showLoginForm && (
        <View style={styles.loginForm}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />
          <View style={styles.submitButton}>
            <Button title="Log in" onPress={handleSubmit} />
          </View>
        </View>
      )}

      {/* Other login options */}
      <TouchableOpacity style={styles.button} onPress={google}>
        <FontAwesome name="google" size={24} color="white" />
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Login with Apple')}>
        <AntDesign name="apple1" size={24} color="white" />
        <Text style={styles.buttonText}>Login with Apple</Text>
      </TouchableOpacity>

      {/* Sign in button */}
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
  loginForm: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  submitButton: {
    marginTop: 10,
  },
});

export default Login;
