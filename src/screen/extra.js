
import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, TouchableOpacity, Linking, Pressable } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Button } from 'react-native-paper';




class extra extends Component {
    constructor() {
        this.state = {
            mLatitude: 0.0,
            mLongitude: 0.0,
            speed: 0,
            destination: "",
            position: {
                latitude: this.state.mLatitude,
                longitude: this.state.mLongitude
            }
        }
        var SendIntentAndroid = require('react-native-send-intent');
    }
    observer() {
        useEffect(() => {

            console.log('locas--->' + this.state.destination)

            // getCords();
        }, [this.state.destination]);
        useEffect(() => { requestLocationPermission() })
        return null

    }
    requestLocationPermission = async () => {
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
                    //console.log(positon)
                    this.setState({ mLatitude: positon.coords.latitude }),
                        this.setState({ mLongitude: positon.coords.longitude }),
                        this.setState({ speed: ((positon.coords.speed) * 3).toFixed() })

                }, (error) => alert(error.message), {
                    enableHighAccuracy: true, timeout: 10000, maximumAge: 0, distanceFilter: 1
                });

            } else {
                console.log("Location permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.mapView}>
                    <Text style={{ fontSize: 50 }} >{this.state.speed} km/h</Text>
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

                        initialRegion={{
                            latitude: this.state.mLatitude,
                            longitude: this.state.mLongitude,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.01
                        }}

                    >
                        <Marker
                            description={this.state.destination}
                            coordinate={this.state.position}
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
                                height: 60,
                                borderColor: 'black',
                                borderWidth: 1.5,
                                borderRadius: 15,
                                color: 'black'

                            }
                        }}
                        fetchDetails={true}


                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true

                            console.log(data, details);

                            this.setState({ destination: data.description })


                            this.setState({ position: { latitude: details.geometry.location.lat, longitude: details.geometry.location.lng } })



                        }}
                        query={{
                            key: 'AIzaSyC4pv4tp3TTOCHW91_x79blj0X6fiM5edA',
                            language: 'en',
                        }}
                    />
                </View>


                <Pressable style={styles.directionsBtn} onPress={() => SendIntentAndroid.openMapsWithRoute(this.state.destination, "d")}  >
                    <Ionicons name="navigate-outline" color="white" size={30} />
                </Pressable>


            </View>


        )
    }



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



export default extra;