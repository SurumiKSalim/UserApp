import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import AppButton from '../../../components/AppButton';
import TextInputComponent from '../../../components/TextInputComponent';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../constants/colors';
import {baseUrl} from '../../../constants/urls';
import {CommonPost} from '../../../services/services';
import {Login, userSelector} from '../../../store/reducers/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {addToken} from '../../../store/reducers/authSlice';
import {clearState} from '../../../store/reducers/authSlice';
const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {loading, isSuccess, isError, errorMessage} = useSelector(userSelector);

  const reg = useSelector(userSelector);
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      navigation.navigate('UserScreen');
    }
    if (isError) {
      const message = JSON.parse(errorMessage);
      Toast.show(message.payload, Toast.SHORT);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);
  const onLogin = () => {
    const body = {
      email: email,
      password: password,
    };
    dispatch(Login(body));
   
  };
  return (
    <View style={style.container}>
      <View style={[style.row]}>
        <View style={style.imageRow}>
          <Image
            source={require('../../../assets/images/login_logo.jpg')}
            style={{height: 300, width: 300}}
          />
        </View>
      </View>
      <View style={[style.row]}>
        <Text style={style.login}>Login</Text>
        <TextInputComponent
          source={require('../../../assets/images/email_icon.png')}
          placeholder={'Email ID'}
          changeText={email => {
            setEmail(email);
          }}
        />
        <TextInputComponent
          source={require('../../../assets/images/lock.png')}
          placeholder={'Password'}
          password={true}
          changeText={password => {
            setPassword(password);
          }}
          forgot={true}
        />

        <View style={style.buttonContainer}>
          <AppButton
            title={'Login'}
            onPress={onLogin}
            titleStyle={{fontSize: 16, fontWeight: '600'}}
            loading={loading}
          />
        </View>
      </View>
      <View style={[style.row, {flex: 1}]}>
        <Text style={[style.text, {marginTop: -10}]}>Or,login with...</Text>
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
        <View style={style.bottomRow}>
          <Text style={style.text}>New to IThickLogistics?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={[style.text, {color: colors.primary}]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default LoginScreen;
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    flex: 1.5,
  },
  imageRow: {
    marginTop: 30,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    fontSize: 30,
    fontWeight: '600',
    color: colors.black,
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
    color: 'black',
  },
  image: {
    height: 20,
    width: 20,
  },
  buttonContainer: {
    marginTop: 45,
  },
  text: {
    textAlign: 'center',
    fontsize: 16,
    fontWeight: '500',
  },
  socialButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    marginTop: 20,
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
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
