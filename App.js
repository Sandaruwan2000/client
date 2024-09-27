import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/Register';
import LoginScreen from './screens/Login';
import Dashboard from './screens/Dashboard';
import UserDetails from './screens/UserDetails';
import Alerts from './screens/Alerts'; 
import Collectors from './screens/Collectors'; 
import Countdown from './screens/Countdown'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="Alerts" component={Alerts} /> 
        <Stack.Screen name="Collectors" component={Collectors} /> 
        <Stack.Screen name="Countdown" component={Countdown} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
