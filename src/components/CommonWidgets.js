import React from 'react';
import {
  Platform,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  ActivityIndicator,
  Linking,
  Alert } from 'react-native';

import I18n from 'react-native-i18n';
import { Metrics, Styles, Icon, Colors, Fonts, Images } from '@theme/';
import styles from './styles';

const CommonWidgets = {
  showNetworkError(msg = null) {
    const message = typeof (msg) == 'object' || msg === null ? I18n.t('NETWORK_ERROR') : msg;
    setTimeout(() => {
      Alert.alert('', message);
    }, 50);
  },
  renderStatusBar(color) {
    if (Platform.OS === 'android') {
      return (
        <StatusBar
          backgroundColor={color}
          barStyle={'light-content'}
          translucent />
      );
    }
    return (
      <View style={{ height: 20, backgroundColor: Colors.brandPrimary }}>
        <StatusBar
          backgroundColor={color}
          barStyle={'light-content'}
          translucent />
      </View>
    );
  },
};
export default CommonWidgets;
