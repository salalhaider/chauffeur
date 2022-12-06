import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';



const SOSScreen = () => {


    var SendIntentAndroid = require("react-native-send-intent");

    

    return (
        <ScrollView>
            <View style={{ height: 80, backgroundColor: 'red', justifyContent: "center" }}>
                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", textAlign: "center" }}>SOS Mode Active</Text>
            </View>

            <View>
                <Pressable onPress={() => (SendIntentAndroid.sendPhoneCall("+92 333 8682868", true), console.log('hello'))}>
                    <View style={{ flexDirection: "row", height: 110, backgroundColor: "green", alignItems: "center" }}>
                        {/*<Image source={require("../Media/locationIcon.jpg")} style={{ height: 70, width: 60, marginLeft: 50, marginTop: 10 }} />*/}
                        <Text style={{ fontSize: 20, padding: 30, color: "white", fontWeight: "bold" }}>Send Location</Text>
                    </View>
                </Pressable>
            </View>



            <View>
                <Pressable>
                    <View style={{ flexDirection: "row", height: 110, backgroundColor: "blue", alignItems: "center" }}>
                        {/*<Image source={require("../Media/locationIcon.jpg")} style={{ height: 70, width: 60, marginLeft: 50, marginTop: 10 }} />*/}
                        <Text style={{ fontSize: 20, padding: 30, color: "white", fontWeight: "bold" }}>Send Location</Text>
                    </View>
                </Pressable>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

});

export default SOSScreen;