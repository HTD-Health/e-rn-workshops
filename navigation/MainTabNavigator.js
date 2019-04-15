import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import ProductsScreen from '../screens/ProductsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import WeightTabBarIcon from './WeightTabBarIcon'
import ProductsTabBarIcon from './ProductsTabBarIcon'
import ProfileTabBarIcon from './ProfileTabBarIcon'
import AddWeightScreen from '../screens/AddWeightScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  AddWeightScreen: AddWeightScreen
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Weight',
  tabBarIcon: WeightTabBarIcon
}

const LinksStack = createStackNavigator({
  Links: ProductsScreen
})

LinksStack.navigationOptions = {
  tabBarLabel: 'Products',
  tabBarIcon: ProductsTabBarIcon
}

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
})

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ProfileTabBarIcon
}

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  ProfileStack
})
