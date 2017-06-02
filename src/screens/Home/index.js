import React, { Component } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { Styles, Images, Metrics, Colors } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';

import Utils from '@src/utils';

let netStateTimer;

class Home extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'red'}}>

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
