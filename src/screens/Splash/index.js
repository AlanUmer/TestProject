import React, { Component } from 'react';
import { Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { Styles, Images, Metrics, Colors } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';

import Utils from '@src/utils';

let netStateTimer;

class Splash extends Component {

  componentDidMount() {
    netStateTimer = setInterval(this.onTimer.bind(this), 1000);
  }
  componentWillUnmount() {
    clearInterval(netStateTimer);
  }
  onTimer() {
    if (this.props.globals.networkState) {
      clearInterval(netStateTimer);
      this.gotoNext();
    }
  }

  gotoNext() {
    this.props.navigation.dispatch(Utils.getResetAction('home'));
  }

  render() {
    return (
      <Image
        resizeMode={'stretch'}
        style={[Styles.fixedFullScreen, Styles.center]}
        source={Images.bkgSplash} >
        {CommonWidgets.renderStatusBar(Colors.brandPrimary)}
        <ActivityIndicator
          size={'large'}
          style={{ marginTop: Metrics.screenHeight / 3 }} />
      </Image>
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
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
