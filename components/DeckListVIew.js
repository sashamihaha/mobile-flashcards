import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { getDecks } from "../utils/api";

export default class DeckListView extends React.Component {
  state = {
    data: ""
  }

  componentDidMount(){
    getDecks().then(decks => this.setState({data: decks}))
  }

  renderDeck = ({ item }) => {
    return (
      <View >
        <TouchableOpacity>
          <Deck deck={item} navigation={this.props.navigation} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    if(this.state.data){
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            data={Object.values(this.state.data)}
            renderItem={this.renderDeck}
            keyExtractor={(deck, index) => index} />
        </View>
      );
    }
    else{
      return null
    }
  }
}

const Deck = ({ deck, navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress={() =>
        navigation.navigate('IndividualDeckView', deck)}>
        <View style={{
          flex: 1, alignItems: 'center', justifyContent: 'center', height: 100
        }}>
          <Text style={{ fontSize: 20 }}>{deck.title}</Text>
          <Text style={{ color: 'grey' }}>{deck.questions.length} cards</Text>
        </View>
        <View style={{ borderWidth: 1, height: 1, width: '100%' }}></View>
      </TouchableOpacity>
    </View>
  )
}