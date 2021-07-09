import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native';
import SearchBar from './SearchBar';
import { haze, rainy, snow, sunny } from '../assets/export';

export default function Weather({ weatherData, fetchWeatherData }) {
    const weatter = 'as';
    const [backgroundImage, setBackgroundImage] = useState(null);

    const { weather,
        name,
        main: { temp, humidity, feels_like },
        wind: { speed }
    } = weatherData;
    const [{ main }] = weather;

    useEffect(() => {
        setBackgroundImage(getBackgroundImg(main));
    }, [weatherData])

    function getBackgroundImg(weather) {
        if (weather === 'Snow') return snow
        if (weather === 'Clear') return sunny
        if (weather === 'Rain') return rainy
        if (weather === 'Haze') return haze
        return haze;
    }
 
    let textColor = backgroundImage !== sunny ? 'white' : 'black'

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='darkgray' />
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover'
            >
                <View style={styles.title}>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 46 }}> Weather</Text>
                </View>
                <SearchBar fetchWeatherData={fetchWeatherData}  />
                <View style={{ flex: 1 }}>
                </View>
                <View style={{ alignItems: 'center', flex:2 }}>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 46 }}>{name}</Text>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold' }}>{main}</Text>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold' }}>  {temp} °C</Text>
                </View>
              
                <View style={styles.extraInfo}>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 28 }}> Luftfeuchte : {humidity} %</Text>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 28 }}> Windgeschw.:{speed}m/s</Text>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 28 }}> Wetterfühligskeit : {feels_like} °C</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {

    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    headerText: {
        fontSize: 36,
        
    },
    extraInfo: {
        flex: 1,
        alignItems: 'baseline'
    },

});
