import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import { getDecks } from "../utils/api";

export default class DeckListView extends React.Component {
  state = {
    data: "",
    animation: 0,
    opacity: new Animated.Value(0)
  }

  componentDidMount() {
    getDecks().then(decks => this.setState({ data: decks }))
  }

  animatedNavigate = (deck) => {
    this.setState({ animation: 1 })
    Animated.timing(this.state.opacity, { toValue: 1, duration: 3000 })
      .start()
    setTimeout(() => {
      this.props.navigation.navigate('IndividualDeckView', deck)
    }, 3000);
  }

  renderDeck = ({ item }) => {
    return (
      <View >
        <TouchableOpacity>
          <Deck deck={item} navigation={this.animatedNavigate} />
        </TouchableOpacity>
      </View>
    );
  }



  render() {
    const { opacity } = this.state
    if (this.state.data) {
      if (this.state.animation === 1) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Animated.Image style={[{ width: 100, height: 100 }, { opacity }]} source={require('./images/question.png')} />
          </View>
        )
      }
      else {
        return (
          <View style={{ flex: 1 }}>
            <FlatList
              data={Object.values(this.state.data)}
              renderItem={this.renderDeck}
              keyExtractor={(deck, index) => index} />
          </View>
        );
      }
    }
    else {
      return null
    }
  }
}



const Deck = ({ deck, navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress={() =>
        navigation(deck)}>
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