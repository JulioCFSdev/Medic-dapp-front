import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import Patient from './patient';
import Scanner from './MedicoScanner';

// Importando constantes de estilo e cores
import { COLORS, SIZES } from '../constants';

// Importando o componente de boas-vindas
import { Welcome } from '../components';

// Importando SafeAreaView e ScrollView
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

// Importando estilos
import styles from '../components/home/welcome/welcome.style';

// Importando debug de react-native-reanimated
import { debug } from 'react-native-reanimated';

// Criação de uma instância do Stack Navigator
const Stack = createStackNavigator();

// Definindo o componente HomeScreen, que será a tela inicial
const HomeScreen = ({ navigation }) => {
  // Função para lidar com o login do médico
  const handleMedicoLogin = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Solicitando ao usuário para se conectar à carteira MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Usuário fez login com MetaMask, redirecionar para MedicoScanner
        navigation.navigate('MedicoScanner');
      } catch (error) {
        // Usuário não fez login ou negou a solicitação, exibir aviso
        console.log('Usuário não fez login com MetaMask');
      }
    } else {
      // MetaMask não está instalado, exibir aviso e redirecionar para o site oficial
      console.log('MetaMask não está instalado');
      renderWebWarning();
    }
  };

  // Função para lidar com o login do paciente
  const handlePacienteLogin = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Solicitando ao usuário para se conectar à carteira MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Usuário fez login com MetaMask, redirecionar para a tela de paciente
        navigation.navigate('Patient');
      } catch (error) {
        // Usuário não fez login ou negou a solicitação, exibir aviso
        console.log('Usuário não fez login com MetaMask');
      }
    } else {
      // MetaMask não está instalado, exibir aviso e redirecionar para o site oficial
      console.log('MetaMask não está instalado');
      renderWebWarning();
    }
  };

  // Função para redirecionar para o site oficial do MetaMask
  const WebRedirect = () => {
    Linking.openURL('https://metamask.io/');
  };

  // Função para renderizar o aviso de redirecionamento da web (se necessário)
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
          <Image
            source={require('../assets/images/Logo.png')}
            style={styles.image}
          />

          {/* Renderizar o componente de boas-vindas */}
          <Welcome></Welcome>

          {/* Botão para login do médico */}
          <TouchableOpacity style={styles.searchBtn} onPress={handleMedicoLogin}>
            <Text style={{ color: 'white' }}>Médico</Text>
          </TouchableOpacity>

          {/* Botão para login do paciente */}
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

// Componente Home que define a estrutura da navegação entre telas
const Home = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      {/* Tela inicial */}
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

      {/* Tela do paciente */}
      <Stack.Screen name="Patient" component={Patient} />

      {/* Tela do scanner do médico */}
      <Stack.Screen name="MedicoScanner" component={Scanner} />
    </Stack.Navigator>
  );
};

// Exportando o componente Home como padrão
export default Home;
