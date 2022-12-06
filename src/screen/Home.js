'use strict';
import React, { createContext, useEffect, useRef, useState, PureComponent } from 'react';
import { Pressable, Image, Animated, StatusBar, AppRegistry, StyleSheet, Text, TouchableOpacity, View, ToastAndroid, PermissionsAndroid, Dimensions } from 'react-native';
import Draggable from 'react-native-draggable';
import { Header } from 'react-native-elements'
import Directions from './DirectionsScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CountDown from 'react-native-countdown-component';
import Geolocation from '@react-native-community/geolocation';
import Modal from 'react-native-modal';
import { RNCamera } from 'react-native-camera';
import { Component } from 'react';
import CameraRoll from "@react-native-community/cameraroll";
var SendIntentAndroid = require("react-native-send-intent");
import { DrawerActions, useNavigation } from '@react-navigation/native';
import NotificationSounds, { playSampleSound } from 'react-native-notification-sounds';
import axios from 'axios'
import stopped from '../media/stoproad.jpeg'
import running from '../media/giphy.gif'



export default function Home({ navigation }) {

    const [speed, setSpeed] = useState(5);
    const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0))
    const [value, setValue] = useState(1)
    const [modalVisible, setModalVisible] = useState(false)
    const [opacityValue, setOpacityValue] = useState(0)
    const [deviceHeight, setDeviceHeight] = useState(Dimensions.get("screen").height)
    const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height)
    const [bottomNavBarHeight, setBottomNavBarHeight] = useState(Dimensions.get("screen").height - Dimensions.get('window').height)
    const [camera, setCamera] = useState(null)
    const [sosNumber, setSosNumber] = useState(null)
    const [counter, setCounter] = useState(1)
    const [photo, setPhoto] = useState(null)
    const [stopRoad, setStopRoad] = useState(true)
    const [picSrc, setPicSrc] = useState('../media/stoproad.jpeg')
    const [dec, setDec] = useState(true)
    const [cameraModal, setCameraModal] = useState(false)

    const getData = async () => {

        try {
            const temp = await AsyncStorage.getItem('sosnumber');
            if (temp !== null) {
                setSosNumber(temp)
                // console.log(temp);
            }
        } catch (error) {
            console.log(error);
        }

    }
    getData()
    const takePicture = async () => {
        if (camera) {
            let x = 0
            let y = 0
            if (speed > 10 && speed < 30) {
                x = 150
                y = 150
            }
            if (speed > 30 && speed < 60) {
                x = 300
                y = 300
            }
            if (speed > 60) {
                x = 500
                y = 500
            }
            const options = { quality: 0.1, base64: true, width: x, height: y, maxFileSize: 0.1 };
            const data = await camera.takePictureAsync(options);
            // console.log(data.base64);
            // axios.post('http://192.168.1.12:5000/pic', {
            //     given: data.base64
            // })
            //     .then(function (response) {
            //         NotificationSounds.getNotifications('notification').then(soundsList => {
            //             console.log('SOUNDS', JSON.stringify(soundsList));
            //             playSampleSound(soundsList[2]);
            //         })
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //         alert("pic fialed")
            //     })



            // CameraRoll.save(data.uri, 'photo').then(onfulfilled => {
            //     ToastAndroid.show(onfulfilled, ToastAndroid.SHORT);

            // }).catch(error => {
            //     ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
            // });
        }
    };



    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {


            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };


    // const _retrieveData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('themeStyle');
    //         if (value !== null) {
    //             // We have data!!
    //             console.log(value);
    //         }
    //     } catch (error) {
    //         // Error retrieving data
    //     }
    // };
    const calSpeed = () => {
        // console.log("working speed")
        Geolocation.watchPosition(positon => {
            // alert("working")
            // console.log(positon)

            setSpeed(((positon.coords.speed)).toFixed() * 3)
            // console.log(((positon.coords.speed) * 3).toFixed());
            // console.log("count: ", count);
            if (positon.coords.speed === 0) {
                setDec(false)

            } else {
                setDec(true)
            }
            count = count + 1
            setPicSrc('../media/stoproad.jpeg')
            // if(speed===0){
            //     setPicSrc('../media/stoproad.jpeg')
            // }
            // else{
            //     setPicSrc('../media/car1.png')
            // }




        }, (error) => console.log(error.message), {
            enableHighAccuracy: true, timeout: 1000, maximumAge: 0, distanceFilter: 1
        });
    }

    var count = 0
    setInterval(() => {
        calSpeed()


    }, 1000);
    setInterval(() => {
        takePicture()

    }, 250);





    return (
        <View style={styles.container}>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>

                <LinearGradient
                    locations={[0, 0.74]}
                    colors={['#000000', '#0f0c24']}
                    style={{ flex: 1, height: "100%" }}
                    useAngle={true}
                    angle={147}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                >
                    <StatusBar backgroundColor="#000000" />
                    <View style={{ height: windowHeight - bottomNavBarHeight, width: '100%', flex: 1 }}>

                        <Pressable onPress={() => navigation.toggleDrawer()}>
                            <Ionicons name="menu-sharp" size={35} color="white" style={{ marginTop: 5, marginLeft: 10, position: "relative" }} />
                        </Pressable>

                        {/* <Image
                            source={{ uri: "file:///data/user/0/com.chauffer/cache/Camera/cbf51282-4426-47e1-b1fa-d17e295a013b.jpg" }}
                            style={{ height: 100, width: 200 }}
                        /> */}


                        {/* <Header
                
                leftComponent={{ icon: 'menu', color: '#fff'  }}
                centerComponent={{ text: 'title' }}
                rightComponent={{ icon: 'search', color: '#fff' }}
            /> */}

                        {/* <View style={{ height: '25%', flexDirection: 'row' }}>
                            <View style={{ width: '25%', alignItems: 'flex-end', justifyContent: "center", flex: 1, }}>
                                <View style={{ width: 15, height: "60%", backgroundColor: "white", marginBottom: -60 }} ></View>
                            </View>

                            <View style={{ width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center', flex: 1, marginHorizontal: 12 }}>
                                <Image source={require("../media/sos.png")} style={{ width: 250, height: 100, borderColor: 'black', borderRadius: 2, alignSelf: 'center', resizeMode: "contain", opacity: 1}} />
                            </View>
                            <View style={{ width: '25%', alignItems: 'flex-start', justifyContent: "center", flex: 1 }}>
                                <View style={{ width: 15, height: "60%", backgroundColor: "white", marginBottom: -60 }}></View>
                            </View>
                        </View> */}
                        <Ionicons name="alert-circle" size={40} color="red" style={{ color: "white", position: "absolute", marginTop: "90%", marginLeft: "47%", zIndex: 10000000 }} />
                        <Image

                            source={require('../media/car1.png')}
                            style={{ width: 90, height: 15, position: "absolute", zIndex: 100, marginTop: "100%", marginLeft: "34%" }}
                        />

                        <View style={{ height: '20%', alignItems: "center", justifyContent: 'center', flex: 1 }}>
                            <Image
                                source={dec ? running : stopped}
                                style={{ alignSelf: 'center', width: "98%", height: "95%" ,marginTop:27}} />
                        </View>

                        <Ionicons name="alert-circle" size={40} color="red" style={{ color: "white", position: "absolute", marginTop: "145%", marginLeft: "47%", zIndex: 10000000 }} />





                        <View style={{ height: 90, flexDirection: "row", borderColor: 'black', borderTopWidth: 1, width: '100%' }}>

                            <View style={{ alignItems: "flex-start", marginLeft: 4, marginBottom: 4 }}>
                                <Modal isVisible={modalVisible}>
                                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                        <View><Text style={{ color: "white", fontSize: 36, fontWeight: "bold" }}>SoS Mode Active</Text></View>


                                        <CountDown
                                            until={5}
                                            size={100}
                                            onFinish={() => (SendIntentAndroid.sendPhoneCall(sosNumber, true), console.log('hello'))}
                                            digitStyle={{ backgroundColor: 'transparent' }}
                                            digitTxtStyle={{ color: 'white', fontSize: 200 }}
                                            timeToShow={['S']}


                                        />

                                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                                            <Ionicons name="close-circle" color="#ac2932" size={80} />
                                        </Pressable>


                                    </View>
                                </Modal>

                                <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.sosBtn}><Text style={styles.sosBtnText}  >SOS</Text></Pressable>





                                {/* <Pressable onPress={callAnimation()}></Pressable> */}




                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                                {/* <Pressable onPress={() => navigation.navigate("SOS")} style={styles.sosBtn}><Text style={styles.sosBtnText}  >SOS</Text></Pressable> */}
                                <View style={{ backgroundColor: "transparent", height: "100%", width: "49%", alignItems: "center", justifyContent: "center" }}>
                                    <Pressable onPress={() =>
                                        NotificationSounds.getNotifications('notification').then(soundsList => {
                                            console.log('SOUNDS', JSON.stringify(soundsList));
                                            playSampleSound(soundsList[Math.floor(Math.random() * 20)]);

                                        })


                                    }>
                                        <Text style={styles.sosBtnText}>{speed} km/h</Text>
                                    </Pressable>
                                </View>
                                {/* <View style={{ backgroundColor: "tranparent",width:"40%",alignItems:"center",justifyContent:"center" }}>
                            <Text>hello</Text>
                        </View> */}


                            </View>
                            <Pressable onPress={() => alert("working")}>
                                <View>
                                    <RNCamera
                                        ref={ref => {
                                            setCamera(ref);
                                        }}
                                        style={styles.cameraPreview}
                                        type={RNCamera.Constants.Type.back}
                                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                                            console.log(barcodes);
                                        }}
                                        onPress={() => alert("changed")}
                                    />
                                </View>
                            </Pressable>
                            <View>
                                <Modal isVisible={cameraModal} backdropOpacity={1}>
                                    <View style={{ flex: 1 }}>
                                        <RNCamera
                                            ref={ref => {
                                                setCamera(ref);
                                            }}
                                            style={styles.cameraPreview}
                                            type={RNCamera.Constants.Type.back}


                                            onGoogleVisionBarcodesDetected={({ barcodes }) => {
                                                console.log(barcodes);
                                            }}
                                        />
                                    </View>
                                </Modal>
                            </View>

                        </View>
                    </View>
                </LinearGradient>



            </View>
        </View>
    );



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        height: 50,
        width: 50

    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    sosBtn: {
        height: 90,
        width: 100,
        backgroundColor: 'red',
        justifyContent: 'center',
        color: 'white',
        // borderRadius: 15,
        borderTopEndRadius: 15,
        alignContent: 'center'
    },
    cameraPreview: {
        height: 130,
        width: 100,
        backgroundColor: 'red',
        justifyContent: 'center',
        color: 'white',
        // borderRadius: 15,
        borderTopStartRadius: 15,
        alignContent: 'center'

    },

    sosBtnText: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowRadius: 15

    },

    geoSpeedContainer: {
        height: 90,
        width: 100,
        borderWidth: 1,
        borderColor: 'black',
        marginLeft: Dimensions.get("window").width - 200,
        borderRadius: 15,
        alignContent: 'center',
        justifyContent: 'center'

    }
});