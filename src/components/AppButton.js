import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
} from 'react-native';
import colors from '../constants/colors';
const AppButton = ({title, style, onPress, loading, titleStyle}) => (
  <TouchableOpacity
    disabled={loading}
    onPress={onPress}
    activeOpacity={0.8}
    style={[styles.container, style]}>
    {loading ? (
      <ActivityIndicator color={colors.white} size="small" />
    ) : (
      <Text style={[styles.text, titleStyle]}>{title}</Text>
    )}
  </TouchableOpacity>
);
export default AppButton;

const styles = StyleSheet.create({
  container: {
    height: 54,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});
