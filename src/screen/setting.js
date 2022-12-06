import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, Pressable, StyleSheet, Image, Dimensions } from 'react-native';
import { colors, Input } from 'react-native-elements';
import { Switch } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
import RadioButtonRN from 'radio-buttons-react-native';
import { Text, TextInput } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
    {
        label: 'Light'
    },
    {
        label: 'Dark'
    },
    {
        label: "Auto"
    }
];



const SettingsScreen = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        if (isEnabled) {
            setColor("skyblue")
        }
        else {
            setColor("blue")
        }
    };



    const [isLaneEnabled, setIsLaneEnabled] = useState(false);
    const toggleLaneSwitch = () => setIsLaneEnabled(previousState => !previousState);

    const [isParkingEnabled, setIsParkingEnabled] = useState(false);
    const toggleParkingSwitch = () => setIsParkingEnabled(previousState => !previousState);

    const [color, setColor] = useState("skyblue")

    const [Themeon, setThemeOn] = useState(false)
    const toggleThemeSwitch = () => setThemeOn(previousState => !previousState);

    const [sosNumber, setSosNumber] = useState(null);

    const [themeStyle, setThemeStyle] = useState("");
    const [decision, setDecision] = useState(0)
    const [count, setCount] = useState(1)

    global.StyleTheme = "global check"

    // console.log(global.StyleTheme);

    // useEffect(async () => {
    //     var temp = null
    //     try {
    //         temp = await AsyncStorage.getItem('sosnumber');
    //         if (temp !== null) {

    //             console.log(temp);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }

    //     if (temp !== null) {
    //         setSosNumber(temp)
    //     }

    // })

    const getData = async () => {

        try {
            const temp = await AsyncStorage.getItem('sosnumber');
            if (temp !== null) {
                setSosNumber(temp)
                console.log(temp);
            }
        } catch (error) {
            console.log(error);
        }

    }


    if (count === 1) {
        getData()
        setCount(9)
    }






    // const _storeData = async () => {
    //     // console.log("i am working storedata");
    //     if (themeStyle === "Light") {
    //         console.log("ifelse workign");
    //         setDecision(1);
    //     } else if (themeStyle === "Dark") {
    //         setDecision(1);
    //     }
    //     try {
    //         await AsyncStorage.setItem(
    //             'themeStyle',
    //             JSON.stringify(decision)

    //         );

    //         console.log(decision)
    //     } catch (error) {
    //         // Error saving data
    //     }

    // }

    // const _storeData = () => {





    // }

    // useEffect(async () => {
    //     try {
    //         await AsyncStorage.setItem(
    //             'sosnumber', sosNumber
    //         );
    //         alert("saved!")

    //     } catch (error) {
    //         console.log(error);
    //     }
    // })






    return (

        <ScrollView>
            <Pressable onPress={() => navigation.toggleDrawer()} style={{ position: "absolute", zIndex: 50, marginTop: 7,marginLeft:5 }}>
                <Ionicons name="menu" size={40} color="black" />
            </Pressable>
            <View style={{ flexDirection: "row", flex: 1,marginTop:10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 30, marginTop: 40 }}>SOS</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{ marginLeft: Dimensions.get("window").width - 120, marginTop: 40 }}
                />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>

                <Input
                    style={{ marginLeft: 10 }}
                    placeholder={sosNumber ? sosNumber : "Enter Sos Number"}
                    keyboardType='numeric'
                    leftIcon={<Ionicons name="call-outline" size={20} style={{ width: 20 }} />}
                    disabled={!isEnabled}
                    value={sosNumber}
                    containerStyle={{
                        width: '70%',
                        marginTop: 15,
                        marginHorizontal: 20
                    }}
                    onChangeText={(a) => setSosNumber(a)}

                />

                <Pressable style={{ backgroundColor: color, height: 40, width: 60, justifyContent: "center", alignItems: "center", marginTop: 25 }} disabled={!isEnabled} onPress={
                    async () => {
                        try {
                            await AsyncStorage.setItem(
                                'sosnumber', sosNumber
                            );
                            alert("saved!")

                        } catch (error) {
                            console.log(error);
                        }
                    }

                }>
                    <Text style={{ fontSize: 18, color: "white" }}>Save!</Text>
                </Pressable>

            </View>
            {/* <TextInput
                label="SOS Number"
                value={sosNumber}
                onChangeText={number => setSosNumber(number)}
                disabled={!isEnabled}
                style={{ marginLeft: 10 }}
                keyboardType='numeric'
                //leftIcon={<Ionicons name="call-outline" size={20}  style = {{width:20}}/>}
                style= {{marginHorizontal: 20,marginTop:10, borderRadius:10, borderTopStartRadius:10,borderTopEndRadius:10}}
                Icon = {<Ionicons name="call-outline" size={20}  style = {{width:20}}/>}
            /> */}
            <View style={{ flexDirection: "row", flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 30, marginTop: 40 }}>Lane Detection</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isLaneEnabled ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleLaneSwitch}
                    value={isLaneEnabled}
                    style={{ marginLeft: Dimensions.get("window").width - 220, marginTop: 40 }}

                />
            </View>
            <View style={{ flexDirection: "row", flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 30, marginTop: 40 }}>Parking Sensor</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isParkingEnabled ? "##f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleParkingSwitch}
                    value={isParkingEnabled}
                    style={{ marginLeft: Dimensions.get("window").width - 220, marginTop: 40 }}

                />
            </View>

            {/* <Pressable style={{ height: 50, marginTop: 40, flexDirection: "row" }} onPress={toggleThemeSwitch}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 30 }}>Theme</Text>
                <Ionicons name={Themeon ? "chevron-up-outline" : "chevron-down-outline"} size={25} style={{ marginLeft: Dimensions.get("window").width - 150 }} />

            </Pressable> */}

            {/* {Themeon &&
                <View>

                    <RadioButtonRN
                        data={data}
                        initial={0}
                        selectedBtn={(selectedtheme) => {
                            setThemeStyle(selectedtheme.label);
                        }}
                        activeColor={'black'}
                        deactiveColor={'black'}
                        style={{ marginHorizontal: 25 }}
                    />


                </View>
            } */}
        </ScrollView>
    );
}

export default SettingsScreen;