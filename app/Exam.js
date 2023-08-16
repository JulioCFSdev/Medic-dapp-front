import React, { useState } from 'react';
import { View, TextInput, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from '../components/home/welcome/welcome.style';
import { COLORS } from '../constants';

const Exam = () => {
  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [examDate, setExamDate] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);
      setExamDate(currentDate.toDateString()); // Atualizar a data do exame
      placeholderTextColor = "Black"
      toggleDatePicker(); // Fechar o DatePicker
    } else {
      toggleDatePicker(); // Fechar o DatePicker sem selecionar uma data
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder="Título do Exame"
    />

    <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder="Médico Responsável"
    />

      <View>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
          />
        )}

        <Pressable onPress={toggleDatePicker}>
          <TextInput
            style={styles.input}
            placeholder="dd/mm/aa"
            value={examDate}
            placeholderTextColor="Black"
            editable={false}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Exam;
