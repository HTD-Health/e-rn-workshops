import React from 'react'
import {
  Button,
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { styles } from './styles'
import { _storeData, _retrieveData } from '../helpers/AsyncStorage'

export default class AddWeightScreen extends React.Component {
  static navigationOptions = {
    title: 'Add new weight'
  }

  state = {
    myWeight: {
      weight: 90,
      date: new Date()
    }
  }

  onAddWeight = async () => {
    const { myWeight } = this.state
    _retrieveData('myWeights').then(values => {
      console.log('values', values)
      _storeData('myWeights', [...(values || []), myWeight]).then(() => {
        this.props.navigation.navigate('Home')
        console.log('NAVIGATION')
      })
    })
  }

  onChange = key => value => {
    console.log('key', key)
    console.log('value', value)
    this.setState({
      myWeight: { ...this.state.myWeight, [key]: value }
    })
  }

  render() {
    const AddWeightString = 'Add new Weight'
    const {
      myWeight: { weight, date }
    } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.label}>{AddWeightString}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(weight)}
            onChangeText={this.onChange('weight')}
          />
        </View>
        <View style={styles.container}>
          {Platform.OS === 'ios' ? (
            <DatePickerIOS date={date} onDateChange={this.onChange('date')} />
          ) : (
            <DatePickerAndroid
              date={date}
              onDateChange={this.onChange('date')}
            />
          )}

          <Button onPress={this.onAddWeight} title="Add" />
        </View>

        <ScrollView />
      </View>
    )
  }
}
