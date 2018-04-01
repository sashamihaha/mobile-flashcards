import React, { Component } from 'react'
import { View, Platform, Text } from 'react-native'
import DeckListView from './components/DeckListVIew'
import NewDeck from './components/NewDeckView'
import IndividualDeckView from './components/IndividualDeckView'
import QuizView from './components/QuizView'
import NewQuestionView from './components/NewQuestionView'
import { setData, getDecks, setLocalNotification } from "./utils/api";
import { TabNavigator, StackNavigator } from 'react-navigation'

let state;

const Tabs = TabNavigator({
  Decks: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'DECKS',
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
    },
  },
}
)

const AppNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: { title: 'Flashcards', headerLeft: null },
  },
  IndividualDeckView: {
    screen: IndividualDeckView,
    navigationOptions: { title: 'Deck', headerLeft: null }    
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: { title: 'Quiz', headerLeft: null },
  },
  NewQuestionView: {
    screen: NewQuestionView,
    navigationOptions: { title: 'Add Card' },
  }
});

export default class App extends React.Component {
  state = {
    decks: "",
  }

  async componentDidMount() {
    await setLocalNotification()
    
    getDecks().then(decks => this.setState({ decks: decks }))
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.decks ? <AppNavigator screenProps={this.state} /> : <Text></Text>}
      </View>
    )
  }
}