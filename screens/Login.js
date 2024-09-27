import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Image, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      try {
        const response = await axios.post('http://192.168.8.130:4000/auth/login', {
          email,
          password,
        });

        const data = response.data;
        console.log('Login Response:', data);

        if (response.status === 200) {
          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('userEmail', email);  
          Alert.alert('Success', 'Login successful!');
          navigation.navigate('Dashboard');
        } else {
          Alert.alert('Error', data.message || 'Login failed');
        }
      } catch (error) {
        console.log('Login Error:', error);
        Alert.alert('Error', 'An error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/1-photoaidcom-cropped.png')} 
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.welcomeText}>Hello</Text>
      <Text style={styles.subText}>Sign In To Your Account</Text>

      <View style={styles.formContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.formTitle}>Sign In</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            placeholderTextColor="#888"
          />

         
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          
          <Text style={styles.registerText}>
            Don't have an account?{' '}
            <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
              Register here.
            </Text>
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#239066',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  subText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 75,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 30,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    color: 'rgb(9, 72, 43)',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#BEE4D7',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#168153', 
    borderRadius: 25, 
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 50,
    marginRight: 50
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16, 
  },
  registerText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#333',
  },
  registerLink: {
    color: '#007bff',
  },
});

export default Login;
