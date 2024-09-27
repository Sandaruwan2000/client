import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Alerts = () => {
  const navigation = useNavigation();
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchAlertMessage = async () => {
      const savedMessage = await AsyncStorage.getItem('alertMessage');
      if (savedMessage) {
        setAlertMessage(savedMessage);
        // Optionally, remove the message after displaying
        // await AsyncStorage.removeItem('alertMessage');
      }
    };

    fetchAlertMessage();
  }, []);

  const handleContactCollectors = () => {
    navigation.navigate('Collectors');
  };

  return (
    <View style={styles.container}>
      {alertMessage ? (
        <View style={styles.alertBox}>
          <Text style={styles.alertMessage}>{alertMessage}</Text>
          <TouchableOpacity style={styles.button} onPress={handleContactCollectors}>
            <Text style={styles.buttonText}>Contact Collectors</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.noAlertMessage}>No alerts at the moment.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CAFECB',
    padding: 20,
  },
  alertBox: {
    backgroundColor: '#A4E4B4',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  alertMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#84CDA1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noAlertMessage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Alerts;
