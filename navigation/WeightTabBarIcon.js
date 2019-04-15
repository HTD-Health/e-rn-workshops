import React from 'react'
import { Platform } from 'react-native'
import TabBarIcon from '../components/TabBarIcon'

const WeightTabBarIcon = ({ focused }) => (
  <TabBarIcon
    focused={focused}
    name={
      Platform.OS === 'ios'
        ? `ios-information-circle${focused ? '' : '-outline'}`
        : 'md-information-circle'
    }
  />
)

export default WeightTabBarIcon
