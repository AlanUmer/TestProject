import { StackNavigator } from 'react-navigation';

import Splash from '@screens/Splash';
import Home from '@screens/Home';

const AppNavigator = StackNavigator({
  splash: { screen: Splash },
  home: { screen: Home },
}, {
  initialRouteName: 'splash',
  navigationOptions: {
    header: null,
    cardStack: { gesturesEnabled: false },
  },
  headerMode: 'screen',
  lazyLoad: true,
});

export default AppNavigator;
