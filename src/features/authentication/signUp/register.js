import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {SignUp, userSelector} from '../../../store/reducers/authSlice';
import {clearState} from '../../../store/reducers/authSlice';
import TextInputComponent from '../../../components/TextInputComponent';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import AppButton from '../../../components/AppButton';
const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loading, isSuccess, isError, errorMessage} = useSelector(userSelector);
  useEffect(() => {
    if (isSuccess) {
      Toast.show('Please login to continue', Toast.SHORT);
      dispatch(clearState());
      navigation.navigate('LoginScreen');
    }
    if (isError) {
      const message = JSON.parse(errorMessage);
      Toast.show(message.payload, Toast.SHORT);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);
  const register = () => {
    const body = {
      email: email,
      password: password,
    };
    dispatch(SignUp(body));
  };

  return (
    <View style={style.container}>
      <View style={style.imageRow}>
        <Image
          source={require('../../../assets/images/login_logo.jpg')}
          style={{height: 250, width: 250}}
        />
      </View>
      <View style={style.row}>
        <Text style={style.signUp}>Sign up</Text>
        <View style={style.socialButtonRow}>
          <TouchableOpacity style={style.socialButton}>
            <Image
              source={require('../../../assets/images/google.png')}
              style={style.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={style.socialButton}>
            <Image
              source={require('../../../assets/images/facebook.png')}
              style={style.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={style.socialButton}>
            <Image
              source={require('../../../assets/images/apple.png')}
              style={style.image}
            />
          </TouchableOpacity>
        </View>
        <Text style={style.text}>Or,register with email...</Text>
        <TextInputComponent
          source={require('../../../assets/images/email_icon.png')}
          placeholder={'Email ID'}
          changeText={email => setEmail(email)}
        />
        <TextInputComponent
          source={require('../../../assets/images/lock.png')}
          placeholder={'Password'}
          password={true}
          changeText={password => {
            setPassword(password);
          }}
        />
        <TextInputComponent
          source={require('../../../assets/images/name.png')}
          placeholder={'Full name'}
        />
        <AppButton
          title={'Continue'}
          style={{marginTop: 40}}
          loading={loading}
          onPress={register}
        />
      </View>
    </View>
  );
};
export default SignUpScreen;
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageRow: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 2,
    marginLeft: 35,
    marginRight: 35,
  },
  signUp: {
    fontSize: 30,
    marginLeft: 10,
    color: colors.black,
    fontWeight: '800',
  },
  socialButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    marginTop: 30,
  },
  socialButton: {
    width: '30%',
    padding: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 20,
    width: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.gary,
    marginTop: 35,
    fontWeight: '500',
  },
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
  },
});
