import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer, Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'


export function DrawerContent(props) {

  return (
    //   <View><Text>Custom Drawer</Text></View>  
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>

        <Drawer.Section>
          <View style={styles.drawerHeader}>
            <Text style={styles.headerText}>Chauffer</Text>
          </View>
        </Drawer.Section>


        <Drawer.Section style={styles.drawerSection}>

          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons
                name="home-outline"
                color={color}
                size={size}
              />
            )}
            label="Home"
            onPress={() => { props.navigation.navigate('Home') }}
            style={{marginTop:10}}
          />


          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons
                name="navigate-outline"
                color={color}
                size={size}
              />
            )}
            label="Directions"
            onPress={() => { props.navigation.navigate('Directions') }}
            style={{marginTop:10}}
          />


          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons
                name="settings-outline"
                color={color}
                size={size}
              />
            )}
            label="Settings"
            onPress={() => { props.navigation.navigate('Settings') }}
            style={{marginTop:10}}
          />



          {/* <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="location-pin"
                color={color}
                size={size}
              />
            )}
            label="Directions"
            // onPress={() => { props.navigation.navigate('DirectionsScreen') }}

          /> */}

          {/* <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="location-pin"
                color={color}
                size={size}
              />
            )}
            label="Directions"
            // onPress={() => { props.navigation.navigate('Directions') }}
            // style={{ marginTop: 10 }}
          /> */}

          {/* <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="settings-outline"
                color={color}
                size={size}
              />
            )}
            label="Setting"
            onPress={() => { props.navigation.navigate('Settings') }}
            style={{ marginTop: 10 }}
          /> */}

        </Drawer.Section>

      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons
              name="exit-outline"
              color={color}
              size={size}
            />
          )}
          label="Exit"

        />
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerHeader: {
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30

  },

  headerText: {
    fontSize: 20
  },

  drawerSection: {
    marginTop: 50
  },

  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  }
})

//export default CustomDrawer;