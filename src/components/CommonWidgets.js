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
import { Metrics, Styles, Colors, Fonts, Images } from '@theme/';
import styles from './styles';

const CommonWidgets = {
  showNetworkError(msg = null) {
    const message = typeof (msg) === 'object' || msg === null ? I18n.t('NETWORK_ERROR') : msg;
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
      <View style={{ height: 20, backgroundColor: Colors.headerColor }}>
        <StatusBar
          backgroundColor={color}
          barStyle={'light-content'}
          translucent />
      </View>
    );
  },
  renderNavBarLeftButton() {
    return (
      <Image
        style={{ width: Metrics.screenWidth * 0.7, height: 40, tintColor: 'white' }}
        resizeMode={'stretch'}
        source={Images.logo} />
    );
  },
  renderNavBarRightButton(onPress) {
    return (
      <TouchableOpacity
        style={{ paddingBottom: 0 }}
        onPress={onPress} >
        <Image
          style={{ width: 35, height: 35 }}
          resizeMode={'stretch'}
          source={Images.close} />
      </TouchableOpacity>
    );
  },
  renderReviewListItem(item, onPress) {
    return (
      <TouchableOpacity
        key={item.id}
        style={Styles.listItemContainer}
        onPress={onPress}>
        <View style={{ padding: Metrics.defaultPadding / 2, paddingBottom: 0, flexDirection: 'row', backgroundColor: Colors.itemColor }}>
          <Image
            source={{ uri: item.logo, width: 80, height: 65 }}
          />
          <View>
            <Text style={{ padding: 5, fontSize: 15, paddingBottom: 0, color: '#ffffff', margin: 0 }}>
              {item.location}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: Metrics.screenWidth * 0.2, paddingLeft: 10, fontSize: 9,  color: '#ffffff'}}>
                Frecuencla
              </Text>
              <Text style={{ width: Metrics.screenWidth * 0.3, paddingLeft: 10, fontSize: 9,  color: '#ffffff'}}>
                105.3 FM
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: Metrics.screenWidth * 0.2, paddingLeft: 10, fontSize: 9,  color: '#ffffff'}}>
                Localidad
              </Text>
              <Text style={{ width: Metrics.screenWidth * 0.3, paddingLeft: 10, fontSize: 9,  color: '#ffffff'}}>
                SSSfajsfjaklsdjflaskjdf
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: Metrics.screenWidth * 0.2, paddingLeft: 10, fontSize: 9,  color: '#ffffff'}}>
                Telefono
              </Text>
              <Text style={{ width: Metrics.screenWidth * 0.3, paddingLeft: 10, fontSize: 9,  color: '#ffffff'}}>
                809-565-4567
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
};
export default CommonWidgets;
