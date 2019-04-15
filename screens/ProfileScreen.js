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
import { _storeData, _retrieveData } from '../helpers/AsyncStorage'

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'My profile'
  }

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      height: '',
      birthDate: '',
      gender: '',
      copyOfData: null
    }

    this.getUserData()
  }

  getUserData = () => {
    _retrieveData('userData').then(data => {
      console.log('data', data)
      if (data) {
        this.setState({ ...data, copyOfData: data })
      }
    })
  }

  onSave = () => {
    if (this.state.height !== this.state.copyOfData.height) {
      // calculate and save new bmi value
      _storeData('userData', this.state).then(result => {
        console.log('result on save data: ', result)
      })
    }
  }

  onChange = key => value => {
    this.setState({ [key]: value })
  }
  render() {
    const nameLabel = 'Name'
    const heightLabel = 'Height'
    const birthDataLabel = 'Birth date'
    const genderLabel = 'Gender'
    const saveLabel = 'Save'

    const male = 'Male'
    const female = 'Female'

    const { name, height, birthDate, gender } = this.state

    return (
      <View style={styles.container}>
        <View>
          <Text>{nameLabel}</Text>
          <TextInput value={name} onChangeText={this.onChange('name')} />
        </View>

        <View>
          <Text>{heightLabel}</Text>
          <TextInput
            keyboardType="numeric"
            value={height}
            onChangeText={this.onChange('height')}
          />
        </View>

        <View>
          <Text>{birthDataLabel}</Text>
          <TextInput
            keyboardType="numeric"
            value={birthDate}
            onChangeText={this.onChange('birthDate')}
          />
        </View>

        <View>
          <Text>{genderLabel}</Text>
          <TextInput
            keyboardType="numeric"
            value={gender}
            onChangeText={this.onChange('gender')}
          />
        </View>

        <View>
          <Button onPress={this.onSave} title={saveLabel} />
        </View>

        <ScrollView />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
