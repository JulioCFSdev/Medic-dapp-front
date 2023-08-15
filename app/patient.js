import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { Stack, useRouter } from "expo-router";
import SplashScreen from 'react-native-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import {COLORS, icons, SIZES} from '../constants';
import{Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome} from '../components';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../components/home/welcome/welcome.style";


const Patient = ({navigation}) =>{
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (text) => {
        setInputValue(text);
      };

    
    const handleSubmit = () => {
        // Aqui você pode fazer algo com o valor do campo de texto (inputValue)
        // Por exemplo, exibir o valor no console:
        console.log('Valor do campo de texto:', inputValue);
    };

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <TextInput
                style={styles.input}
                value={inputValue}
                onChangeText={handleInputChange}
                placeholder="Procure por..."
            />

        </SafeAreaView>
    )
}

export default Patient;