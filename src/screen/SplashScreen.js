import React,{useEffect} from 'react';
import {View, Image,StatusBar, Button,Text, Dimensions} from 'react-native';


const splashScreen = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Home")
        },3000)
    }, [])

    return(
    <View style = {{height:Dimensions.get("window").height, width:Dimensions.get("window").width, justifyContent:"center",alignItems:"center",flex:1, backgroundColor:'white'}}>
        <Image source = {require('../media/Chauffer.gif')} style={{height:'70%', width:'70%'}}/>
        {/* <Text> CHauffer </Text> */}
    </View>)
}

export default splashScreen;