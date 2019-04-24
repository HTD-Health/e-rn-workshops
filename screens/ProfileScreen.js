import React from 'react'
import {
  Button,
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Picker
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { _storeData, _retrieveData } from '../helpers/AsyncStorage'
import { styles } from './styles'

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'My profile'
  }

  constructor(props) {
    super(props)

    this.state = {
      userData: {
        name: '',
        height: '',
        birthDate: '',
        gender: ''
      },
      copyOfData: null
    }

    this.getUserData()
  }

  getUserData = () => {
    _retrieveData('userData').then(userData => {
      if (userData) {
        this.setState({ userData, copyOfData: userData })
      }
    })
  }

  onSave = () => {
    if (this.state.height !== this.state.copyOfData.height) {
      // calculate and save new bmi value
      _storeData('userData', this.state.userData).then(result => {
        console.log('result on save data: ', result)
      })
    }
  }

  onChange = key => value => {
    this.setState({ userData: { ...this.state.userData, [key]: value } })
  }
  render() {
    const nameLabel = 'Name'
    const heightLabel = 'Height'
    const birthDataLabel = 'Birth date'
    const genderLabel = 'Gender'
    const saveLabel = 'Save'

    const {
      userData: { name, height, birthDate, gender }
    } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.label}>{nameLabel}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={this.onChange('name')}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>{heightLabel}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={height}
            onChangeText={this.onChange('height')}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>{birthDataLabel}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={birthDate}
            onChangeText={this.onChange('birthDate')}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>{genderLabel}</Text>
          <Picker
            style={styles.picker}
            selectedValue={gender}
            onValueChange={this.onChange('gender')}>
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Male" value="Male" />
          </Picker>
        </View>

        <View style={styles.container}>
          <Button onPress={this.onSave} title={saveLabel} />
        </View>

        <ScrollView />
      </View>
    )
  }
}
