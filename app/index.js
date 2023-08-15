import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { Stack, useRouter } from "expo-router";
import SplashScreen from 'react-native-splash-screen';


import {COLORS, icons, SIZES} from '../constants';
import{Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome} from '../components';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../components/home/welcome/welcome.style";

const Home = () =>{
    const router = useRouter();
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle:{backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerTitle: "Login",
                    headerTitleAlign: "center"
                }}
            />

            <ScrollView showsVerticalScrollIndicator = {false}>
                <View style={{
                        flex:1,
                        padding: SIZES.medium
                    }}>

                    <Image source={require('../assets/images/Logo.png')} style={styles.image}/>

                    <Welcome></Welcome>

                    <TouchableOpacity style={styles.searchBtn} onPress={()=>{}}>
                        <Text style = {{color: "white"}}>Médico</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.searchBtn2} onPress={()=>{}}>
                        <Text style = {{color: "white"}}>Paciente</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;