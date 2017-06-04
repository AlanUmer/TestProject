import React, { Component } from 'react';
import { Text, View, DeviceEventEmitter, TouchableOpacity, ActivityIndicator } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { connect } from 'react-redux';
import { SliderVolumeController } from 'react-native-volume-controller';
import { setDetail } from '@actions/globals';

import { Styles, Images, Metrics, Colors } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import Api from '@api';

import Utils from '@src/utils';

// import ModalDropdown from 'react-native-modal-dropdown';
// const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9'];
// <ModalDropdown style={{ flex: 1, top: 32, left: 8 }} options={DEMO_OPTIONS_1} />

const PLAYING = 'PLAYING';
const STREAMING = 'STREAMING';
const PAUSED = 'PAUSED';
const STOPPED = 'STOPPED';
const ERROR = 'ERROR';
const METADATA_UPDATED = 'METADATA_UPDATED';
const BUFFERING = 'BUFFERING';
const START_PREPARING = 'START_PREPARING'; // Android only
const BUFFERING_START = 'BUFFERING_START'; // Android only

import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

class Player extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this.state = {
      status: STOPPED,
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
        console.log('event', evt);
        if (evt.status === METADATA_UPDATED && evt.key === 'StreamTitle') {
          this.setState({ song: evt.value });
          console.log('state', this.state);
        } else if (evt.status !== METADATA_UPDATED) {
          this.setState(evt);
          console.log('state', this.state);
        }
      },
    );

    ReactNativeAudioStreaming.getStatus((error, status) => {
      (error) ? console.log(error) : this.setState(status);
    });
  }
  _onPress() {
    switch (this.state.status) {
      case PLAYING:
      case STREAMING:
        ReactNativeAudioStreaming.pause();
        break;
      case PAUSED:
        ReactNativeAudioStreaming.resume();
        break;
      case STOPPED:
      case ERROR:
        ReactNativeAudioStreaming.play('http://104.167.3.56:8000/40principalesec', { showIniOSMediaCenter: true, showInAndroidNotifications: true });
        break;
      case BUFFERING:
        ReactNativeAudioStreaming.stop();
        break;
    }
  }

  async loadingDetailData(id) {
    const detail = await Api.getDetail(id);
    this.props.setDetail(detail);
    ReactNativeAudioStreaming.play('http://104.167.3.56:8000/40principalesec', { showIniOSMediaCenter: true, showInAndroidNotifications: true });
  }
  renderHeader() {
    return null;
  }
  renderFooter() {
    if (!this.state.loading) return null;
    return (
      <ActivityIndicator size={'large'} />
    );
  }
  handleRefresh() {
  }
  handleLoadMore() {
    if (!this.state.loading) {
      console.log('load more.....');
    }
  }
  onUserPressed() {
    this.props.navigation.goBack();
  }
  render() {
    let icon = null;
    switch (this.state.status) {
      case PLAYING:
      case STREAMING:
        icon = <Text>॥</Text>;
        break;
      case PAUSED:
      case STOPPED:
      case ERROR:
        icon = <Text>▸</Text>;
        break;
      case BUFFERING:
      case BUFFERING_START:
      case START_PREPARING:
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
        <View style={[Styles.listContainer, { paddingTop: Metrics.defaultPadding, backgroundColor: 'red' }]}>
          <TouchableOpacity onPress={this._onPress}>
            <Text>ddddd</Text>
          </TouchableOpacity>
          <View style={[Styles.center, { flex: 1 }]}>
            <SliderVolumeController />
          </View>

        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setDetail: detail => dispatch(setDetail(detail)),
  };
}
function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}
export default connect(mapStateToProps, mapDispatchToProps)(Player);
