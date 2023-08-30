import React from 'react';
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, FlatList } from "react-native";
import { Stack } from "expo-router";


import { COLORS } from '../constants';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../components/home/welcome/welcome.style";

import Exam from './Exam';
import QR from './PatientQR';


const Patient = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text);
  };


  const handleSubmit = () => {
    console.log('Valor do campo de texto:', inputValue);
  };

  const data = [
  
  ];

  const handleButtonPress = itemId => {
    console.log('Botão pressionado para o item com ID:', itemId);
  };

  const handleButton2Press = itemId => {
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>

      <Image source={require('../assets/images/profile.png')} style={styles.profile} />

      <Text style={styles.welcomeMessage}>Bem Vindo Paciente!</Text>

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

      <TouchableOpacity style={styles.ExamBtn} onPress={() => navigation.navigate('PatientQR')}>
        <Text style={{ color: 'white' }}>Gerar QR Code</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ExamBtn2} onPress={() => navigation.navigate('Exam')}>
        <Text style={{ color: 'white' }}>+</Text>
      </TouchableOpacity>


    </SafeAreaView>
  )
}

const PatientNav = () => {
  return (
    <Stack.Navigator initialRouteName="Patient">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: 'Home',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="Exam" component={Exam} />
      <Stack.Screen name="PatientQR" component={QR} />
    </Stack.Navigator>
  );
};

export default Patient;