import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Countdown = () => {
  const navigation = useNavigation();
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = async () => {
      const userEmail = await AsyncStorage.getItem('userEmail');
      const countdownKey = `countdownEndTime_${userEmail}`;
      const endTime = await AsyncStorage.getItem(countdownKey);

      if (endTime) {
        const endTimeMs = parseInt(endTime, 10);
        const interval = setInterval(() => {
          const now = new Date().getTime();
          const distance = endTimeMs - now;

          if (distance < 0) {
            clearInterval(interval);
            setTime({
              days: 0,
              hours: 0,
              minutes: 0,
              seconds: 0,
            });
            // Save the alert message and end time
            const endDate = new Date(endTimeMs).toLocaleString();
            const alertMessage = `Food waste has been in the bin for more than 6 minutes. (End Time: ${endDate})`;
            AsyncStorage.setItem('alertMessage', alertMessage);
            //navigation.navigate('Alerts');
            return;
          }

          setTime({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          });
        }, 1000);

        return () => clearInterval(interval);
      }
    };

    calculateTime();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.timerContainer}>
        <View style={styles.timeSection}>
          <Text style={styles.timeLabel}>Days</Text>
          <View style={styles.timeBox}>
            <Text style={styles.timeValue}>{time.days}</Text>
          </View>
        </View>
        <View style={styles.timeSection}>
          <Text style={styles.timeLabel}>Hours</Text>
          <View style={styles.timeBox}>
            <Text style={styles.timeValue}>{time.hours}</Text>
          </View>
        </View>
        <View style={styles.timeSection}>
          <Text style={styles.timeLabel}>Minutes</Text>
          <View style={styles.timeBox}>
            <Text style={styles.timeValue}>{time.minutes}</Text>
          </View>
        </View>
        <View style={styles.timeSection}>
          <Text style={styles.timeLabel}>Seconds</Text>
          <View style={styles.timeBox}>
            <Text style={styles.timeValue}>{time.seconds}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CAFECB',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: '#84CDA1',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timerContainer: {
    flexDirection: 'row',
  },
  timeSection: {
    alignItems: 'center',
    margin: 10,
  },
  timeBox: {
    width: 50,
    height: 50,
    backgroundColor: '#A4E4B4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Countdown;
