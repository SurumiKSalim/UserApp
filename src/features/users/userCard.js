import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
const UserCard = ({item}) => {
  return (
    <View style={style.container}>
      <View style={style.row}>
        <TouchableOpacity>
          {item.avatar ? (
            <Image source={{uri: item.avatar}} style={style.profile} />
          ) : (
            <Image
              source={require('../../assets/images/profilepic.png')}
              style={style.profile}
            />
          )}
        </TouchableOpacity>
        <View style={style.detailView}>
          <Text style={style.text}>
            {item.first_name + ' ' + item.last_name}
          </Text>
          <Text style={style.text}>{item.email}</Text>
        </View>
      </View>
    </View>
  );
};
export default UserCard;
const style = StyleSheet.create({
  main: {
    marginTop: 60,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D4CECE8A',
    borderRadius: 20,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailView: {
    marginLeft: 30,
  },
  profile: {
    height: 70,
    width: 70,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});
