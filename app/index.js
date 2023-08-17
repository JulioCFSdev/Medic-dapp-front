import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import Patient from './patient';


import { COLORS, SIZES } from '../constants';
import { Welcome } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../components/home/welcome/welcome.style';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
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

          <TouchableOpacity style={styles.searchBtn} onPress={() => { }}>
            <Text style={{ color: 'white' }}>Médico</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.searchBtn2}
            onPress={() => navigation.navigate('Patient')}
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
    </Stack.Navigator>
  );
};

export default Home;
