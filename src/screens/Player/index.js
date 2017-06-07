import React, { Component } from 'react';
import { Text, View, Image, DeviceEventEmitter, TouchableOpacity, ActivityIndicator } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { connect } from 'react-redux';
import { SliderVolumeController } from 'react-native-volume-controller';
import { setDetail, setPlayerStatus } from '@actions/globals';

import { Styles, Images, Metrics, Colors } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import Api from '@api';

import Utils from '@src/utils';
import Global from '@src/global';
import ModalDropdown from 'react-native-modal-dropdown';
const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9'];
// <ModalDropdown style={{ flex: 1, top: 32, left: 8 }} options={DEMO_OPTIONS_1} />


import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

class Player extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this.state = {
      status: Global.STOPPED,
      song: '',
    };
  }
  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.loadingDetailData(params.id);
  }
  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener(
      'AudioBridgeEvent', (evt) => {
        this.props.setPlayerStatus(evt.status);
        // console.log('event', evt);
        // if (evt.status === Global.METADATA_UPDATED && evt.key === 'StreamTitle') {
        //   this.setState({ song: evt.value });
        //   console.log('state', this.state);
        // } else if (evt.status !== Global.METADATA_UPDATED) {
        //   this.setState(evt);
        //   console.log('state', this.state);
        // }
      },
    );

    ReactNativeAudioStreaming.getStatus((error, status) => {
      (error) ? console.log(error) : this.props.setPlayerStatus(status);
    });
  }
  _onPress() {
    switch (this.props.globals.playerStatus) {
      case Global.PLAYING:
      case Global.STREAMING:
        ReactNativeAudioStreaming.pause();
        break;
      case Global.PAUSED:
        ReactNativeAudioStreaming.resume();
        break;
      case Global.STOPPED:
      case Global.ERROR:
        ReactNativeAudioStreaming.play('http://104.167.3.56:8000/40principalesec', { showIniOSMediaCenter: true, showInAndroidNotifications: true });
        break;
      case Global.BUFFERING:
        ReactNativeAudioStreaming.stop();
        break;
    }
  }

  async loadingDetailData(id) {
    const detail = await Api.getDetail(id);
    this.props.setDetail(detail);
    ReactNativeAudioStreaming.play('http://104.167.3.56:8000/40principalesec', { showIniOSMediaCenter: true, showInAndroidNotifications: true });
  }
  onUserPressed() {
    this.props.navigation.goBack();
  }
  render() {
    let icon = null;
    switch (this.props.globals.playerStatus) {
      case Global.PLAYING:
      case Global.STREAMING:
        icon = <Text>॥</Text>;
        break;
      case Global.PAUSED:
      case Global.STOPPED:
      case Global.ERROR:
        icon = <Text>▸</Text>;
        break;
      case Global.BUFFERING:
      case Global.BUFFERING_START:
      case Global.START_PREPARING:
        icon = (<ActivityIndicator
          animating
          style={{ height: 80 }}
          size="large"
                />);
        break;
    }
    return (
      <View style={{ flex: 1 }} >
        {CommonWidgets.renderStatusBar(Colors.headerColor)}
        <NavigationBar
          statusBar={{ style: 'light-content' }}
          style={Styles.navBarStyle}
          tintColor={Colors.brandSecondary}
          rightButton={CommonWidgets.renderNavBarRightButton(() => this.props.navigation.goBack())}
          leftButton={CommonWidgets.renderNavBarLeftButton()} />
         <View style={[Styles.listContainer]}>
          <View style={{  width: Metrics.screenWidth, height: 100, backgroundColor: '#1f1f1f'}}>
            <SliderVolumeController />
            <TouchableOpacity onPress={this._onPress}>
              <Text style={{ fontSize: 40, color: 'white', alignSelf: 'center' }}>Player Button</Text>
            </TouchableOpacity>  
          </View>
          <Image
            style={{ flex: 1,  width: null, height: null, padding: 30 }}
            resizeMode={'stretch'}
            source={Images.background}>
            
            <View style={{ flex: 1, backgroundColor: '#1f1f1f' }}>
              <Text>Title</Text>
              <ModalDropdown style={{ flex: 1, top: 32, left: 8 }} options={DEMO_OPTIONS_1} />
              <View>
                <Text>Title</Text>
                <Image
                  style={{ width: 100, height: 70, paddingTop: 15 }}
                  resizeMode={'stretch'}
                  source={Images.background} />
              </View>
              <View>
                <Text>Titleafasdfasdfasdfasdf</Text>
                
              </View>
            </View>
            
          </Image>
          
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setDetail: detail => dispatch(setDetail(detail)),
    setPlayerStatus: playerStatus => dispatch(setPlayerStatus(playerStatus)),
  };
}
function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}
export default connect(mapStateToProps, mapDispatchToProps)(Player);
