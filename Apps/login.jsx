import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const Login = () => {
  const navigation = useNavigation();
  const [emailPrefix, setEmailPrefix] = useState('');
  const [code, setCode] = useState(new Array(6).fill('')); // An array to hold each digit of the code
  const [codeSent, setCodeSent] = useState(false);
  const inputs = useRef([]);

  const sendVerificationCode = () => {
    if (emailPrefix) {
      const email = `${emailPrefix}@student.uts.edu.au`;
      console.log('Sending verification code to:', email);
      setCodeSent(true);
      Alert.alert('Verification', 'A verification code has been sent to your email.');
    } else {
      Alert.alert('Invalid Email', 'Please enter your student ID before the domain.');
    }
  };

  const verifyCode = () => {
    if (code.join('') === '123456') { // Replace '123456' with your actual verification logic
      Alert.alert('Verification Success', 'You have been successfully logged in!');
      navigation.navigate('Main');
    } else {
      Alert.alert('Verification Error', 'Invalid verification code, please try again.');
    }
  };

  const focusNext = (index, value) => {
    setCode(code.map((c, i) => (i === index ? value : c)));
    if (index < 5 && value) {
      inputs.current[index + 1].focus();
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

      {!codeSent ? (
        <View style={styles.inputContainer}>
          <View style={styles.emailInputContainer}>
            <TextInput
              placeholder="Student ID"
              value={emailPrefix}
              onChangeText={setEmailPrefix}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.domainText}>@student.uts.edu.au</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={sendVerificationCode}>
            <Text style={styles.buttonText}>Send Verification Code</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.codeContainer}>
            {code.map((_, index) => (
              <TextInput
                key={index}
                ref={(ref) => inputs.current[index] = ref}
                style={styles.codeInput}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(text) => focusNext(index, text)}
                value={code[index]}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={verifyCode}>
            <Text style={styles.buttonText}>Verify Code</Text>
          </TouchableOpacity>
        </>
      )}
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
    marginBottom: 20,
  },
  logo: {
    width: 180,
    height: 110,
  },
  inputContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 8,
  },
  emailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  domainText: {
    fontSize: 16,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInput: {
    width: 40,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 24,
    marginRight: 6,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#7B68EE',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default Login;
