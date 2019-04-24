import React from 'react'
import { FlatList, StyleSheet, Text, View, Button } from 'react-native'
import { styles } from './styles'
import { _retrieveData, _storeData } from '../helpers/AsyncStorage'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'My weight'
  }

  constructor(props) {
    super(props)

    this.state = {
      userData: null,
      myWeights: null,
      myBMI: null
    }
  }

  componentDidMount() {
    this.getUserData()
  }

  getUserData = () => {
    Promise.all([
      _retrieveData('userData'),
      _retrieveData('myWeights'),
      _retrieveData('myBMI')
    ]).then(([userData, myWeights, myBMI]) => {
      if (userData) {
        this.setState({ userData, copyOfData: userData })
      }
      if (myWeights) {
        this.setState({ myWeights })
      }
      if (myBMI) {
        this.setState({ myBMI })
      }
    })
  }

  renderWeightRow = ({ item }) => {
    // todo render item with weight data
    return (
      <View style={styles.row}>
        <Text>{new Date(item.date).toISOString().slice(0, 10)}</Text>
        <Text>{item.weight}</Text>
        <Button
          style={styles.button}
          onPress={this.onEditItem(item)}
          title={'Edit'}
        />
        <Button
          style={styles.button}
          onPress={this.onDeleteItem(item)}
          title={'Delete'}
        />
      </View>
    )
  }

  onEditItem = item => () => {
    this.props.navigation.navigate('AddWeightScreen', item)
  }

  onDeleteItem = item => async () => {
    const newMyWeights = this.state.myWeights.filter(({ id }) => item.id !== id)
    await _storeData('myWeights', newMyWeights).then(result => {
      this.setState({ newMyWeights })
      // todo refresh after delete item
    })
  }

  keyExtractor = (item, index) => {
    return String(index)
  }

  addNewWeight = () => {
    this.props.navigation.navigate('AddWeightScreen')
  }

  render() {
    const { myBMI, myWeights, userData } = this.state
    const isHeight = !userData || !userData.height || !Number(userData.height)
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {isHeight && (
            <Text style={styles.labelError}>
              Insert Your data in Profile Tab
            </Text>
          )}
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Weight chart</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>BMI</Text>
          <Text>{myBMI || '-'}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Add weight</Text>
          <Button
            style={styles.button}
            onPress={this.addNewWeight}
            title={'Add new weight'}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>My Weights</Text>
          <FlatList
            // todo missing empty content
            keyExtractor={this.keyExtractor}
            data={myWeights}
            renderItem={this.renderWeightRow}
          />
        </View>
      </View>
    )
  }
}
