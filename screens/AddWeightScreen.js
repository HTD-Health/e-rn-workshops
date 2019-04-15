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

export default class AddWeightScreen extends React.Component {
  static navigationOptions = {
    title: 'Add new weight'
  }

  state = {
    myWeight: null,
    newWeight: {
      weight: 90,
      date: new Date()
    }
  }

  onAddWeight = () => {
    const { newWeight } = this.state

    this.setState({
      myWeight: newWeight,
      newWeight: {
        weight: newWeight.weight,
        date: new Date()
      }
    })
  }

  onChangeNewDate = date => {
    const {
      myWeight: { weight }
    } = this.state
    this.setState({
      newWeight: { weight, date }
    })
  }

  render() {
    const AddWeightString = 'Add new Weight'
    const {
      newWeight: { weight, date }
    } = this.state

    return (
      <View style={styles.container}>
        <View>
          <Text>{AddWeightString}</Text>
          <TextInput keyboardType="numeric" value={String(weight)} />
        </View>
        <View>
          {Platform.OS === 'ios' ? (
            <DatePickerIOS date={date} onDateChange={this.onChangeNewDate} />
          ) : (
            <DatePickerAndroid
              date={date}
              onDateChange={this.onChangeNewDate}
            />
          )}

          <Button onPress={this.onAddWeight} title="Add" />
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
