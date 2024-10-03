import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingScreen from './Screen/Stack Screen/OnboardingScreen';
import LoginScreen from './Screen/Stack Screen/LoginScreen';
import RegisterScreen from './Screen/Stack Screen/RegisterScreen';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import HomeScreen from './Screen/Tab Screen/HomeScreen';
import IncomeScreen from './Screen/Tab Screen/IncomeScreen'
import ExpenseScreen from './Screen/Tab Screen/ExpenseScreen'
import ReportsScreen from './Screen/Tab Screen/ReportsScreen';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'
import Profile from './Screen/Stack Screen/Profile';
import AddScreen from './Screen/Stack Screen/AddScreen';
import AddIncome from './Screen/Stack Screen/AddIncome';
import AddExpense from './Screen/Stack Screen/AddExpense';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import ForgotPassword from './Screen/Stack Screen/ForgotPassword';
import ResetPassword from './Screen/Stack Screen/ResetPassword';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ backgroundColor:"#71d322",borderLeftColor: '#71d322'  }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: 'bold',
        color:"white"
      }}
      text2Style={{
        fontSize: 15,
        color:"white"
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ backgroundColor:"#f65858",borderLeftColor: '#f65858' }}
      text1Style={{
        fontWeight: 'bold',
        fontSize: 17,
        color:"white"
      }}
      text2Style={{
        fontSize: 15,
        color:"white"
      }}
    />
  ),
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  )
};

function TabNav(){
  return(
    <Tab.Navigator screenOptions={{tabBarActiveTintColor:"#3498DB"}}>
      <Tab.Screen 
        name='Home' 
        component={HomeScreen} 
        options={{
          
          headerShown: false, 
          tabBarIcon: ({color}) => <MaterialIcons name='home' size={30} color={color} />
        }}
      />
  
      <Tab.Screen 
        name='Income' 
        component={IncomeScreen} 
        options={{
          headerShown: true, 
          tabBarIcon: ({color}) => <MaterialIcons name='money' size={25} color={color} />
        }}
      />
  
      <Tab.Screen 
        name='Expense' 
        component={ExpenseScreen} 
        options={{
          headerShown: true, 
          tabBarIcon: ({color}) => <FontAwesome name='credit-card' size={25} color={color} />
        }}
      />
  
      <Tab.Screen 
        name='Profiles' 
        component={Profile} 
        options={{
          headerShown: false, 
          tabBarIcon: ({color}) => <MaterialIcons name='person' size={30} color={color} />
        }}
      />
    </Tab.Navigator>
  )
  
}

function StackNav(){
  return(
    <Stack.Navigator >
        <Stack.Screen name='Onboarding' component={OnboardingScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Forgot Password' component={ForgotPassword} options={{headerShown: false}}/>
        <Stack.Screen name='Reset Password' component={ResetPassword} options={{headerShown: false}}/>
        <Stack.Screen name='HomeT' component={TabNav} options={{headerShown: false}}/>
        <Stack.Screen name='Add Income' component={AddIncome} options={{headerShown: true}}/>
        <Stack.Screen name='Add Expense' component={AddExpense} options={{headerShown: true}}/>
  </Stack.Navigator>
  )

}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getData() {
    const data = await AsyncStorage.removeItem("isLoggedIn");
    console.log(data, 'at app.js');
    setIsLoggedIn(data === 'true');
  }

  useEffect(() => {
    getData();
    console.log("User is logged in:", isLoggedIn);
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    // Add a simple loading screen while waiting for the async storage to return the login state
    return (
      <View style={styles.container}>
        <ActivityIndicator/>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer >
      {isLoggedIn?<TabNav/>: <StackNav/>}
      <Toast config={toastConfig}/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
