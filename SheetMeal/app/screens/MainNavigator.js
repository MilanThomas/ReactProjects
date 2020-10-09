import React from 'react';
import { Constants } from 'expo';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MapScreen from './MapScreen';
import MapSettingsScreen from './MapSettingsScreen';
import ReviewScreen from './ReviewScreen';
import FavoriteScreen from './FavoriteScreen';
import ProfileScreen from './ProfileScreen';

const MapStack = StackNavigator({
  mapView: { screen: MapScreen },
  mapSettings: { screen: MapSettingsScreen }
}, {
  navigationOptions: {
    tabBarLabel: 'Map',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="near-me"
        size={24}
        color={tintColor}
        underlayColor="transparent"
      />
    ),
    headerBackTitle: 'Map',
    headerTintColor: '#007aff',
    headerStyle: {
      height: 50 + Constants.statusBarHeight,
      paddingTop: Constants.statusBarHeight,
      justifyContent: 'center',
      backgroundColor: '#efeff4',
      borderBottomColor: '#ceced2',
      borderBottomWidth: 1
    },
    headerTitleStyle: {
      color: '#000000',
      alignSelf: 'center',
    },
  }
});

const Tabs = TabNavigator({
  map: { screen: MapStack },
  review: { screen: ReviewScreen },
  favorite: { screen: FavoriteScreen },
  profile: { screen: ProfileScreen }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    scrollEnable: false,
    activeTintColor: '#007aff',
    inactiveTintColor: '#8e8e93',
    style: {
      backgroundColor: '#efeff4',
      borderTopColor: '#8e8e93',
      borderTopWidth: 1,
    },
    labelStyle: {
      fontSize: 12,
    },
    indicatorStyle: {
      backgroundColor: '#007aff'
    }
  }
});

const MainNavigator = Tabs;

export default MainNavigator;
