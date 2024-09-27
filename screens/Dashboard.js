import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({ navigation }) => {
  const handleStartCount = async () => {
    const userEmail = await AsyncStorage.getItem('userEmail');  
    const countdownKey = `countdownEndTime_${userEmail}`;
    const existingEndTime = await AsyncStorage.getItem(countdownKey);
    
    if (!existingEndTime) {
      const startTime = new Date().getTime();
      const endTime = startTime + 360000;  
      await AsyncStorage.setItem(countdownKey, endTime.toString());
    }
  
    navigation.navigate('Countdown');
  };
  

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Food Waste Management</Text>
        <Image
          source={require('../assets/images/—Pngtree—food waste composting machine_5942404.png')}
          style={styles.image}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Alerts')}
          >
            <Text style={styles.buttonTitle}>Alerts</Text>
            <Text>View and manage your food waste alerts.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Collectors')}
          >
            <Text style={styles.buttonTitle}>Collectors</Text>
            <Text>Food waste collectors map.</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerButtonContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartCount}
          >
            <Text style={styles.startButtonText}>Start Count</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#CAFECB', 
  },
  content: {
    flexGrow: 1,  
    paddingHorizontal: 20,  
    paddingBottom: 20,  
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#004d00',  
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    width: '45%',
    padding: 15,
    backgroundColor: '#A4E4B4',  
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  centerButtonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  startButton: {
    backgroundColor: '#84CDA1',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dashboard;
