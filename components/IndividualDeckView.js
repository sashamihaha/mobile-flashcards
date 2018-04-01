import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

class IndividualDeckView extends React.Component {

    state = {
        deck: ""
    }

    componentDidMount() {
        this.setState({ deck: this.props.navigation.state.params })
    }

    startQuiz() {
        if (this.state.deck.questions.length === 0) {
            Alert.alert(
                'Add at least one card to start',
            )
        }
        else {
            this.props.navigation.navigate('QuizView', this.state.deck)
        }
    }

    render() {
        const deck = this.state.deck;
        return (
            <View style={{
                flex: 1, alignItems: 'center', justifyContent: 'center'
            }}>
                {this.state.deck ? (<View><View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20 }}>{deck.title}</Text>
                    <Text style={{ color: 'grey' }}>{deck.questions.length} cards</Text>
                </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('NewQuestionView', deck)}>
                        <View style={{ backgroundColor: 'white', margin: 20, height: 50, width: 200, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Add Card</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.startQuiz()}>
                        <View style={{ backgroundColor: 'black', margin: 20, height: 50, width: 200, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white' }}>Start Quiz</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                    <View style={{ backgroundColor: 'white', margin: 20, height: 50, width: 200, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>                        
                            <Text style={{ color: 'black' }}>Back to Decks</Text>
                        </View>
                    </TouchableOpacity>
                </View>) : <Text></Text>}
            </View>
        );
    }
}

export default IndividualDeckView