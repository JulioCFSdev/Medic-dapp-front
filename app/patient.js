import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, FlatList } from "react-native";
import { Stack, useRouter } from "expo-router";
import SplashScreen from 'react-native-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScrollBarIndicator from 'react-native-scroll-indicator';
import { Picker } from '@react-native-picker/picker';


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

    const data = [
        { id: '1', text: 'Exame 1' ,image1: require('../assets/images/edit.png'), image2: require('../assets/images/trash.png') },
        { id: '2', text: 'Exame 2', image1: require('../assets/images/edit.png'), image2: require('../assets/images/trash.png') },
        { id: '3', text: 'Exame 3', image1: require('../assets/images/edit.png'), image2: require('../assets/images/trash.png')},
        // ... outros itens
      ];

      const handleButtonPress = itemId => {
        // Função para lidar com o pressionar do botão, usando o ID do item
        console.log('Botão pressionado para o item com ID:', itemId);
      };

      const handleButton2Press = itemId => {
        // Função para lidar com o pressionar do botão 2, usando o ID do item
        console.log('Botão 2 pressionado para o item com ID:', itemId);
      };
    
      const renderItem = ({ item }) => (
        <View style={styles.item}>
          <Text>{item.text}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress(item.id)}
            >
            <Image source={item.image1} style={styles.buttonImage} />
          </TouchableOpacity>

          <TouchableOpacity
          style={[styles.button2]}
          onPress={() => handleButton2Press(item.id)}
            >
            <Image source={item.image2} style={styles.buttonImage} />
            </TouchableOpacity>

        </View>
      );

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>

            <Stack.Screen
                    options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: 'Home',
                    headerTitleAlign: 'center',
                    }}
                />

            <Image source={require('../assets/images/profile.png')} style={styles.profile} />

            <TextInput
                style={styles.input}
                value={inputValue}
                onChangeText={handleInputChange}
                placeholder="Procure por..."
            />

            <View style={styles.listContainer}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
            
            <TouchableOpacity style={styles.ExamBtn} onPress={() => {}}>
                <Text style={{ color: 'white' }}>Gerar QR Code</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ExamBtn2} onPress={() => {}}>
                <Text style={{ color: 'white' }}>+</Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}

export default Patient;