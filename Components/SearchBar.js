import React, { useState  } from 'react'
import { View, TextInput, StyleSheet, Dimensions, Text } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'; 

export default function SearchBar({ fetchWeatherData }) {

    const [cityName, setCityName] = useState('');

    return (
        <View style={styles.searchBar}>
            <TextInput 
                placeholder='Ort eingeben'
                value={cityName}
                onChangeText={(text) => setCityName(text)}
            />
            <EvilIcons name="search" size={30} color="black"  onPress={() => fetchWeatherData(cityName)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
       backgroundColor: 'white',
       marginTop: 35,
       flexDirection: 'row',
       justifyContent: 'space-between',
       borderWidth: 1.5,
       borderRadius: 25,
       marginHorizontal: 10,
       paddingHorizontal: 30
       
    }
})
