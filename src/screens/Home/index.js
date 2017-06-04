import React, { Component } from 'react';
import { Image, Text, View, FlatList, ActivityIndicator } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { connect } from 'react-redux';

import { Styles, Images, Metrics, Colors } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';

import Utils from '@src/utils';


// import ModalDropdown from 'react-native-modal-dropdown';
// const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9'];
// <ModalDropdown style={{ flex: 1, top: 32, left: 8 }} options={DEMO_OPTIONS_1} />
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      loading: false,
      page: 0,
      refreshing: false,
      comments: '',
    };
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
  onUserPressed(item) {
    this.props.navigation.navigate('player', {id: item.id});
  }
  render() {
    return (
      <View style={{ flex: 1 }} >
        {CommonWidgets.renderStatusBar(Colors.headerColor)}
        <NavigationBar
          statusBar={{ style: 'light-content' }}
          style={Styles.navBarStyle}
          tintColor={Colors.brandSecondary}
          rightButton={CommonWidgets.renderNavBarRightButton(() => this.props.navigation.goBack())}
          leftButton={CommonWidgets.renderNavBarLeftButton()} />
        <View style={[Styles.listContainer, { paddingTop: Metrics.defaultPadding }]}>
          <FlatList
            keyboardShouldPersistTaps={'always'}
            data={this.props.globals.radios}
            renderItem={({ item }) => CommonWidgets.renderReviewListItem(item, () => this.onUserPressed(item))}
            keyExtractor={item => item.id}
            ListHeaderComponent={this.renderHeader.bind(this)}
            ListFooterComponent={this.renderFooter.bind(this)}
            onRefresh={this.handleRefresh.bind(this)}
            refreshing={this.state.refreshing}
            onEndReached={this.handleLoadMore.bind(this)}
            onEndReachedThreshold={50} />
        </View>
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
