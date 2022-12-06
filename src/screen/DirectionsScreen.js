
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, TouchableOpacity, Linking, Pressable, ToastAndroid } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Button } from 'react-native-paper';



const DirectionsScreen = ({ navigation }) => {

  const [mLatitude, setmLatitude] = useState(31.400746);
  const [mLongitude, setmLongitude] = useState(74.210920);
  //const [granted, setGranted] = useState('');
  const [speed, setSpeed] = useState(0);


  const [destination, setDestination] = useState('');
  const [position, setPosition] = useState({
    latitude: mLatitude,
    longitude: mLongitude
  })

  // useEffect(() => {

  //   console.log('locas--->' + destination)

  //   // getCords();
  // }, [destination]);

  const updateMarker = () => {

  }


  useEffect(() => { requestLocationPermission() })

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.ACCESS,
        {
          title: "Location Permission",
          message: "Permission to Access Location ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log("You can use the Location");
        {/*--------------------------------------------------Geolocation Api--------------------------- */ }
        Geolocation.watchPosition(positon => {
          // alert("positin is :", positon)
          setmLatitude(positon.coords.latitude)
          setmLongitude(positon.coords.longitude)
          setPosition({ latitude: positon.coords.latitude, longitude: positon.coords.longitude })
          setSpeed(((positon.coords.speed) * 3).toFixed())


        }, (error) => ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT), {
          enableHighAccuracy: true, timeout: 1, maximumAge: 0, distanceFilter: 1
        });

      } else {
        ToastAndroid.show(`camera permissions denied`, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  var SendIntentAndroid = require('react-native-send-intent');





  return (
    <View style={styles.container}>


      <View style={styles.mapView}>

        <Text style={{ fontSize: 50 }} >{speed} km/h</Text>
        {/*--------------------------------------------------Maps------------------------------- */}
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
          followsUserLocation={true}

          pitchEnabled={true}
          showsCompass={true}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoors={true}

          region={{
            latitude: mLatitude,
            longitude: mLongitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.01
          }}

        >
          <Marker
            description={destination}
            coordinate={position}
            pinColor={'red'}
          />
          {/* <Polyline
          coordinates={[
            {latitude: mLatitude, longitude: mLongitude}, // optional
            {latitude: position.latitude, longitude: position.longitude}, // optional
        ]}
        strokeWidth={4}
          /> */}

        </MapView>
      </View>



      {/* <View style={{ height: '30%', position: "absolute", bottom: 0 }}><Text style={{ fontSize: 50 }}>Speed {speed} km/h {'\n'}lat: {mLatitude} {'\n'}long: {mLongitude}</Text></View> */}
      <View style={styles.placesInput}>

        {/*---------------------------------->>>>>>>>>>>>>>>>> GOOGLE PLACES API <---------------------------------*/}
        <GooglePlacesAutocomplete
          placeholder={'Destination'
          }
          styles={{
            textInputContainer: {
              paddingVertical: 8,
              marginHorizontal: 8,
              opacity: 0.8
            }, textInput: {
              fontSize: 24,
              paddingVertical: 8,
              height: 40,
              borderColor: 'black',
              borderWidth: 1.5,
              borderRadius: 15,
              color: 'black',
              marginLeft: 40

            }
          }}
          fetchDetails={true}


          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true

            console.log(data, details);

            setDestination(data.description);


            setPosition({ latitude: details.geometry.location.lat, longitude: details.geometry.location.lng })



          }}
          query={{
            key: 'AIzaSyC4pv4tp3TTOCHW91_x79blj0X6fiM5edA',
            language: 'en',
          }}
        />
      </View>


      <Pressable style={styles.directionsBtn} onPress={() => SendIntentAndroid.openMapsWithRoute(destination, "d")}  >
        <Ionicons name="navigate-outline" color="white" size={30} />
      </Pressable>



      <Pressable onPress={() => navigation.toggleDrawer()} style={{ position: "absolute", zIndex: 50, marginTop: 7 }}>
        <Ionicons name="menu" size={40} color="black"  />
      </Pressable>



    </View>


  )
}

const styles = StyleSheet.create({

  container: {
    height: '100%',
    flexDirection: 'column',
    flex: 1
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  placesInput: {
    position: 'absolute',
    // left: 0,
    // right:0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    backgroundColor: 'transparent'

  },
  directionsInput: {
    width: '50%'
  },

  directionsBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 35,
    backgroundColor: '#3c3c41',
    borderRadius: 50,
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center"
  }



});


// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: 400,
//     width: 400,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

export default DirectionsScreen;

