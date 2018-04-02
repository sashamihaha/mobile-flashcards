import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { addDeck } from "../utils/api";

export default class NewDeckView extends React.Component {

  state = {
    title: "",
  }

  async addDeck() {
    if (this.state.title){
    const newDecks = await addDeck(this.state.title);
    const deck = newDecks[this.state.title];
    this.props.navigation.navigate('IndividualDeckView', deck)
    }
    else {
      Alert.alert(
        'Fill in all fields!',
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
            <Text style={{ fontSize: 25, textAlign: 'center' }}>What is the title of your new deck?</Text>
          </View>
          <View><TextInput onChangeText={(title) => this.setState({ title: title })} value={this.state.title} style={{ paddingLeft: 10, margin: 20, height: 50, width: 250, borderRadius: 8, borderWidth: 2 }} /></View>
          <TouchableOpacity onPress={() => this.addDeck()}>
            <View style={{ backgroundColor: 'black', margin: 20, height: 50, width: 100, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white' }}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}