import React, { Component } from 'react';
import { Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { Styles, Images, Metrics, Colors } from '@theme/';
import { setRadios, setLocations, setGenres } from '@actions/globals';
import CommonWidgets from '@components/CommonWidgets';
import Api from '@api';

import Utils from '@src/utils';

let netStateTimer;

class Splash extends Component {

  componentDidMount() {
    this.loadingData();
    // netStateTimer = setInterval(this.onTimer.bind(this), 4000);
  }
  componentWillUnmount() {
    clearInterval(netStateTimer);
  }
  async loadingData() {
    const topics = await Api.getInfo();
    this.props.setGenres(topics.genres);
    this.props.setLocations(topics.locations);
    console.log('topics', topics);
    const radios = await Api.getNameSearch('d');
    this.props.setRadios(radios);
    this.gotoNext();
    // console.log('result', topics);
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
    setRadios: radios => dispatch(setRadios(radios)),
    setLocations: locations => dispatch(setLocations(locations)),
    setGenres: genres => dispatch(setGenres(genres)),
  };
}
function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
