import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Platform, Vibration } from 'react-native';
import { Location, Permisssions } from 'expo';
import Weather from './Components/Weather';
import SearchBar from './Components/SearchBar';

const API_KEY = "86973e3f49e7e7dff5842493c7c3c7a5";
export default function App() {


    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);
    const WarningPATTERN = [50, 100, 50, 100];

    async function fetchWeatherData(cityName) {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        try {
            const response = await fetch(API);
            if (response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWeatherData('Zurich');
    }, [])


    if (!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color='gray' size={36} />
            </View>

        )
    }

    else if (weatherData === null) {
        Vibration.vibrate(WarningPATTERN);
        return (
            <View style={styles.container}>
                <Text>Weather</Text>
                <SearchBar fetchWeatherData={fetchWeatherData} />
                <Text style={styles.primaryText}>Fehler! Bitte nochmal eingeben!</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryText: {
        margin: 20,
        fontSize: 28
    }
});
