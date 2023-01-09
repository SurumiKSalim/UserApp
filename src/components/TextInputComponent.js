import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from 'react-native';
import colors from '../constants/colors';
import {useIsFocused} from '@react-navigation/native';
const TextInputComponent = ({
  source,
  placeholder,
  changeText,
  password,
  forgot,
}) => {
  const input = useRef(null);
  const focused = useIsFocused();
  useEffect(() => {
    input.current.clear();
  }, [focused]);
  return (
    <View style={style.inputSection}>
      <Image source={source} style={style.image} resizeMode="contain" />
      <TextInput
        ref={input}
        style={[style.inputStyle]}
        placeholder={placeholder}
        onChangeText={changeText}
        secureTextEntry={password}
      />
      {forgot ? (
        <TouchableOpacity style={style.button}>
          <Text style={style.buttonText}>Forgot?</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
export default TextInputComponent;
const style = StyleSheet.create({
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopWidth: 0,
    borderBottomWidth: 2,
    height: 0,
    width: '100%',
    marginTop: 35,
    padding: 12,
    borderColor: 'rgba(174, 174, 174, 0.3)',
  },

  inputStyle: {
    width: '80%',
    height: 60,
    color: colors.gary,
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 10,
  },
  image: {
    height: 20,
    width: 20,
    marginLeft: -10,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    height: 20,
    marginLeft: -10,
  },
});
