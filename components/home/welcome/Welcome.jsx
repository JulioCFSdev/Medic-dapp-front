import React from 'react'
import { View, Text } from 'react-native'

import styles from './welcome.style'

const Welcome = () => {
  return (
    <View>
      <Text style={styles.welcomeMessage}>Você é Médico? Ou Paciente?</Text>
    </View>
  )
}

export default Welcome