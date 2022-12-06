import React, { useEffect, useState } from 'react';
import { Text, View, StatusBar, StatusBarStyle, LogBox } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/screen/Home';
import SettingScreen from './src/screen/setting';
import { DrawerContent } from './src/components/customDrawer';
import SosScreen from './src/screen/sos';
import DirectionsScreen from './src/screen/DirectionsScreen';
import SplashScreen from './src/screen/SplashScreen';
import { Provider as PaperProvider, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Value } from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';
// import DirectionsScreen from './src/screen/DirectionsScreen'
// import { createStackNavigator } from '@react-navigation/stack';
//import Ionicon from 'react-native-vector-icons/Ionicons'
//import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'

// import HomeScreen from './src/Screens/HomeScreen';
// import SOSScreen from './src/Screens/SOSScreen';
// import DirectionsScreen from './src/Screens/DirectionsScreen';
// import SettingsScreen from './src/Screens/SettingsScreen';
//import DrawerContent from './src/components/customDrawer';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const CustomLightTheme = {
  ...DefaultTheme,
  ...PaperDefaultTheme,
  //dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: '#ffffff',
    text: '#333333'
    // primary: 'rgb(255, 45, 85)',
    // background: 'rgb(255, 255, 255)',
    // card: 'rgb(255, 255, 255)',
    // text: 'rgb(0, 0, 0)',
    // border: 'rgb(199, 199, 204)',
    // notification: 'rgb(255, 69, 58)',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  ...PaperDarkTheme,
  // dark: false,
  colors: {
    ...DarkTheme.colors,
    ...PaperDarkTheme.colors,
    background: '#333333',
    text: '#ffffff'
    // primary: 'rgb(255, 45, 85)',
    // background: 'rgb(255, 255, 255)',
    // card: 'rgb(255, 255, 255)',
    // text: 'rgb(0, 0, 0)',
    // border: 'rgb(199, 199, 204)',
    // notification: 'rgb(255, 69, 58)',
  },
};






// const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [themeStyle, setThemeStyle] = useState(true)

  // const _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('themeStyle');
  //     if (value !== null) {
  //      alert(value)

  //     } else {
  //       alert("empty")
  //     }
  //   } catch (error) {
  //     alert("fuck you")
  //   }
  // };
  // _retrieveData();

  // console.log(global.StyleTheme);
  // if (global.StyleTheme === "Light") {

  //   setThemeStyle(true)

  // } else if (global.StyleTheme === "Dark") {
  //   setThemeStyle(false)
  // }







  return (
    <PaperProvider theme={CustomLightTheme}>
      <NavigationContainer theme={CustomLightTheme} >
        <StatusBar />
        <Drawer.Navigator
          drawerContent={props =>
            <DrawerContent {...props} />}
          initialRouteName="Settings"
        >
          <Drawer.Screen name="Home" component={HomeScreen}

            options={({ navigation }) => ({
              headerTintColor: "black",
              headerShown: false,
              headerStyle: { backgroundColor: 'transparent' },
              headerTitle: props => <Text> </Text>,
              headerRight: () => (
                <View style={{ flexDirection: "row", marginHorizontal: 16 }}>

                  {/* <Pressable onPress={() => navigation.navigate("Directions")}><Text style={{ fontSize: 20 }}>Navigation</Text></Pressable> */}

                </View>

              )

            })}
          />

          <Drawer.Screen name="SOS" component={SosScreen} />

          <Drawer.Screen name="SplashScreen" component={SplashScreen} />

          <Drawer.Screen name="Directions" component={DirectionsScreen}

          //   options={({ navigation }) => ({
          //   headerTitle: props => <Text> </Text>,
          //   headerRight: () => (
          //     <View style={{ flexDirection: "row", marginHorizontal: 16 }}>
          //       <Pressable onPress={() => navigation.navigate("Home")}><Text style={{ fontSize: 20 }}>Home</Text></Pressable>
          //     </View>
          //   )
          // })}
          />

          <Drawer.Screen name="Settings" component={SettingScreen}
          // options={
          //   {
          //     headerTitle: props => <Text> </Text>,
          //     headerRight: () => (
          //       <View style={{ flexDirection: "row", marginHorizontal: 16 }}>
          //         <Text style={{ fontSize: 20, marginRight: 160 }}>Settings</Text>
          //       </View>
          //     )
          //   }}
          />

        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;