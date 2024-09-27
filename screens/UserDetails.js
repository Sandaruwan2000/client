import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const UserDetails = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const token = await AsyncStorage.getItem('token');

        if (token) {
          
          const response = await axios.get('http://192.168.43.161:4000/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setUser(response.data);
        } else {
          setError('No token found');
        }
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      // Clear token from AsyncStorage
      await AsyncStorage.removeItem('token');
      
      
      // Navigate to the login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      });
    } catch (err) {
      setError('Failed to logout');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      if (token) {
        // Send request to delete user account
        await axios.delete('http://192.168.43.161:4000/auth/delete', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        
        await AsyncStorage.clear();
        
        // Navigate to the login screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }]
        });
      } else {
        setError('No token found');
      }
    } catch (err) {
      setError('Failed to delete account');
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: handleDeleteAccount,
          style: 'destructive'
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User Profile</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.userDetails}>
        {user ? (
          <View style={styles.detailsContainer}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{user.name}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{user.address}</Text>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{user.phone}</Text>
          </View>
        ) : (
          <Text style={styles.noData}>No user data available</Text>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.logoutButton}>
          <Button title="Logout" onPress={handleLogout} color="#FF6347" />
        </View>
        <View style={styles.deleteButton}>
          <Button title="Delete Account" onPress={confirmDelete} color="#FF6347" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A4E4B4',
    padding: 30
  },
  header: {
    alignItems: 'center',
    marginBottom: 20
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30
  },
  userDetails: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
    marginTop: -100
  },
  detailsContainer: {
    paddingHorizontal: 20
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  value: {
    fontSize: 18,
    marginBottom: 15
  },
  noData: {
    fontSize: 18,
    textAlign: 'center'
  },
  buttonsContainer: {
    marginTop: 15,
  },
  logoutButton: {
    marginBottom: 10
  },
  deleteButton: {
    marginBottom: 10
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18
  }
});

export default UserDetails;
