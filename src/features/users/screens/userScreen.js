import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import UserCard from '../userCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsers} from '../../../redux/reducers/getUserSlice';
import {baseUrl} from '../../../constants/urls';
import {CommonGet} from '../../../services/services';
import AppButton from '../../../components/AppButton';
import {clearState, logout} from '../../../redux/reducers/authSlice';
const UserScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(fetchUsers());
    return () => {
      clearState();
    };
  }, []);
  const users = useSelector(state => state.getUsers);
  console.log(users);
  return (
    <View style={style.container}>
      <View style={{marginTop: 50}}>
        <FlatList
          data={users.users}
          keyExtractor={item => item.id}
          renderItem={({item}) => <UserCard item={item} />}
        />
        <View style={style.buttonContainer}>
          <AppButton
            title={'Logout'}
            titleStyle={style.buttonText}
            onPress={() => {
              dispatch(logout());
              navigation.navigate('LoginScreen');
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default UserScreen;
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer: {
    margin: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
