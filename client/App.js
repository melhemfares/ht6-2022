import React, {Fragment, useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import Constants from 'expo-constants';

import { createAppContainer, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Home,
  Login,
  Register,
  ForgotPassword,
  Dashboard,
  Play
} from './views';

const siteName = 'workingTitle';

const Stack = createStackNavigator(); 
const Tab = createMaterialBottomTabNavigator();

const AccRoute = () => <Text>Account</Text>;

const ChatRoute = () => <Text>Chat</Text>;

const DashRoute = () => <Dashboard />;

const PlayRoute = () => <Text>Play</Text>;

const RedeemRoute = () => <Text>Redeem</Text>;

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  function handleSignIn() {
    setSignedIn(true);
  }
  async function handleSignOut() {
    await AsyncStorage.removeItem("@auth_token");
    setSignedIn(false);
  }

  useEffect(() => {
    console.log("app started")
    // declare the data fetching function
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("@auth_token");
      console.log("a")
      if (token !== null) {
        // trust the client
        handleSignIn();
      } else {
        setSignedIn(false);
      }
    }
  
    fetchToken()
      .catch(console.error);
  }, [])

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          {!signedIn ? (
          <>
            <Stack.Screen name="Login">
            {props => <Login {...props} signIn={handleSignIn} siteName={siteName}/>}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {props => <Register {...props} signIn={handleSignIn} siteName={siteName}/>}
            </Stack.Screen>
            <Stack.Screen name="Forgot Password">
              {props => <ForgotPassword {...props} siteName={siteName}/>}
            </Stack.Screen>
          </>
          ) : (
          <Stack.Screen name={siteName} options={{headerLeft: (props) => null }} component={(props) => { 
            return (
              <>
              {/* <Appbar.Header style={styles.container}>
                <Appbar.Content title={siteName} />
                <Appbar.Action icon="share" onPress={() => {}} />
              </Appbar.Header>*/}
              {/*<BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
              />*/}
               <Tab.Navigator
              initialRouteName="Dashboard"
              activeColor="#e91e63"
              labelStyle={{ fontSize: 12 }}
              style={{ backgroundColor: 'tomato' }}
            >
              <Tab.Screen
                name="Account"
                component={AccRoute}
                options={{
                  tabBarLabel: 'Account',
                  tabBarIcon: ({ focused, color }) => (
                    <MaterialCommunityIcons name={focused ? "account" : "account-outline"} color={color} size={26} />
                  ),
                }}
              />
              <Tab.Screen
                name="Chat"
                component={ChatRoute}
                options={{
                  tabBarLabel: 'Chat',
                  tabBarIcon: ({ focused, color }) => (
                    <MaterialCommunityIcons name={focused ? "chat" : "chat-outline"} color={color} size={26} />
                  ),
                }}
              />
              <Tab.Screen
                name="Dashboard"
                options={{
                  tabBarLabel: 'Dashboard',
                  tabBarIcon: ({ focused, color }) => (
                    <MaterialCommunityIcons name={focused ? "view-dashboard" : "view-dashboard-outline"} color={color} size={26} />
                  ),
                }}
              >
                {props => <Dashboard {...props} signOut={handleSignOut}/>}
              </Tab.Screen>
              <Tab.Screen
                name="Play"
                component={Play}
                options={{
                  tabBarLabel: 'Play',
                  tabBarIcon: ({ focused, color }) => (
                    <MaterialCommunityIcons name={focused ? "gamepad-variant" : "gamepad-variant-outline"} color={color} size={26} />
                  ),
                }}
              />
              <Tab.Screen
                name="Redeem"
                component={RedeemRoute}
                options={{
                  tabBarLabel: 'Redeem',
                  tabBarIcon: ({ focused, color }) => (
                    <MaterialCommunityIcons name={focused ? "gift" : "gift-outline"} color={color} size={26} />
                  ),
                }}
              />
            </Tab.Navigator>
              </>
          )}}/>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});