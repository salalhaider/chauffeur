import React, { useRef, useState, useEffect } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import { set } from 'react-native-reanimated';


const GooglePlacesInput = (prop) => {

    const [locas, setLocas] = useState('');

    const getCords = () => {
        Geocoder.init("AIzaSyC4pv4tp3TTOCHW91_x79blj0X6fiM5edA");

        
        Geocoder.from(locas)
        .then(json => {
            var location = json.results[0].geometry.location;
            console.log("cordinates---" + location);
        })
        .catch(error => console.warn(error));
    }

    var SendIntentAndroid = require('react-native-send-intent');

    useEffect(() => {
        
        console.log('locas--->' + locas)
        getCords();
    }, [locas]);

    return (
        <GooglePlacesAutocomplete
            placeholder={prop.label}
            styles={{
                textInputContainer: {
                    paddingVertical: 8,
                    marginHorizontal: 8,
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



            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data,details);

                setLocas(data);
                SendIntentAndroid.openMapsWithRoute(data.description, "d");
                //console.log("locas---" + locas);
                //getCords();
                
            }}
            query={{
                key: 'AIzaSyC4pv4tp3TTOCHW91_x79blj0X6fiM5edA',
                language: 'en',
            }}
        />
    );
};

export default GooglePlacesInput;