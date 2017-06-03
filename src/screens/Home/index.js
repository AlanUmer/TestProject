import React, { Component } from 'react';
import { Image, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { Styles, Images, Metrics, Colors } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';

import Utils from '@src/utils';

import ModalDropdown from 'react-native-modal-dropdown';
const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9'];

class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1 }} >
        <ModalDropdown style={{ flex: 1, top: 32, left: 8 }} options={DEMO_OPTIONS_1} />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
