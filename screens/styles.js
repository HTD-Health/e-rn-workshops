import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: 'center'
  },
  input: {
    padding: 4,
    height: 40,
    borderWidth: 1,
    borderColor: '#424242',
    borderRadius: 3
  },
  label: {
    justifyContent: 'center',
    marginTop: 10
  },
  labelError: {
    justifyContent: 'center',
    color: 'red',
    marginTop: 10
  },
  button: {
    borderColor: '#4D9E7E',
    borderWidth: 1,
    borderColor: '#424242',
    borderRadius: 3
  },
  picker: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#424242',
    borderRadius: 3
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
