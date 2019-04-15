import React from 'react'
import { Platform } from 'react-native'
import TabBarIcon from '../components/TabBarIcon'

const ProfileTabBarIcon = ({ focused }) => (
  <TabBarIcon
    focused={focused}
    name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
  />
)

export default ProfileTabBarIcon
