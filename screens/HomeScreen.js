import React from 'react'
import { FlatList, StyleSheet, Text, View, Button } from 'react-native'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'My weight'
  }

  state = {
    userData: {
      height: 190
    },
    myWeights: [
      {
        id: 1,
        date: Date(),
        weight: 90
      },
      {
        id: 2,
        date: Date(),
        weight: 95
      },
      {
        id: 3,
        date: Date(),
        weight: 85
      }
    ],
    myBMI: 24.9
  }

  renderWeightRow = ({ item, index }) => {
    // todo render item with weight data
    return (
      <View key={index}>
        <Text>{item.date}</Text>
        <Text>{item.weight}</Text>
      </View>
    )
  }

  keyExtractor = ({ id }) => {
    return String(id)
  }

  addNewWeight = () => {
    this.props.navigation.navigate('AddWeightScreen')
  }

  render() {
    const { myBMI, myWeights, userData } = this.state
    return (
      <View style={styles.container}>
        <View>
          {!!userData && !!userData.height && (
            <Text>Insert Your data in Profile Tab</Text>
          )}
        </View>
        <View>
          <Text>Weight chart</Text>
        </View>
        <View>
          <Text>BMI</Text>
          <Text>{myBMI || '-'}</Text>
        </View>
        <View>
          <Text>Add weight</Text>
          <Button onPress={this.addNewWeight} title={'Add new weight'} />
        </View>
        <View>
          <Text>My Weights</Text>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={myWeights}
            renderItem={this.renderWeightRow}
          />
        </View>
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
