import React from 'react';
import { View, Text, TouchableOpacity, Image, Platform, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import Patient from './patient';
import Scanner from './MedicoScanner';


import { COLORS, SIZES } from '../constants';
import { Welcome } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../components/home/welcome/welcome.style';
import { debug } from 'react-native-reanimated';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const handleMedicoLogin = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Usuário fez login com MetaMask, redirecionar para MedicoScanner
        navigation.navigate('MedicoScanner');
      } catch (error) {
        // Usuário não fez login ou negou a solicitação, exibir aviso
        console.log('Usuário não fez login com MetaMask');
        // Você pode exibir um aviso aqui usando um componente ou um modal
      }
    } else {
      // MetaMask não está instalado, exibir aviso
      console.log('MetaMask não está instalado');
      {renderWebWarning()}
      // Você pode exibir um aviso aqui usando um componente ou um modal
    }
  };

  const handlePacienteLogin = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Usuário fez login com MetaMask, redirecionar para a tela de paciente
        navigation.navigate('Patient');
      } catch (error) {
        // Usuário não fez login ou negou a solicitação, exibir aviso
        console.log('Usuário não fez login com MetaMask');
        // Você pode exibir um aviso aqui usando um componente ou um modal
      }
    } else {
      // MetaMask não está instalado, exibir aviso
      console.log('MetaMask não está instalado');
      {renderWebWarning()}
      // Você pode exibir um aviso aqui usando um componente ou um modal
    }
  };

  const WebRedirect = () => {
    console.log("Entrou aqui")
    // Redirecionar para o site oficial do MetaMask
    Linking.openURL('https://metamask.io/');
  };

  const renderWebWarning = () => {
    if (Platform.OS === 'web' || Platform.OS === 'android') {
      return (
        WebRedirect()
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Image source={require('../assets/images/Logo.png')} style={styles.image} />

          <Welcome></Welcome>

          <TouchableOpacity style={styles.searchBtn}  onPress={handleMedicoLogin}>
            <Text style={{ color: 'white' }}>Médico</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.searchBtn2}
            onPress={handlePacienteLogin}
          >
            <Text style={{ color: 'white' }}>Paciente</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Home = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: 'Login',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="Patient" component={Patient} />
      <Stack.Screen name="MedicoScanner" component={Scanner} />
    </Stack.Navigator>
  );
};

export default Home;
