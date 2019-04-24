import { AsyncStorage } from 'react-native'

export const _storeData = async (itemName, data) => {
  try {
    await AsyncStorage.setItem(itemName, JSON.stringify(data))
    return true
  } catch (error) {
    return error
  }
}

export const _retrieveData = async itemName => {
  try {
    const value = await AsyncStorage.getItem(itemName)
    if (value !== null) {
      return JSON.parse(value)
    }
  } catch (error) {
    return error
  }
}
