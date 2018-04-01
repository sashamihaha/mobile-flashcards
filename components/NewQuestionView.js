import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { addCardToDeck } from "../utils/api";

export default class NewQuestionView extends React.Component {
    state = {
        question: "",
        answer: "",
    }
    async addCard() {
        if (this.state.question && this.state.answer){
            const newQuestion = {
                "answer": this.state.answer,
                "question": this.state.question
            };
            const newDecks = await addCardToDeck(this.props.navigation.state.params.title, newQuestion);
            const newDeck = newDecks[this.props.navigation.state.params.title]
            this.props.navigation.navigate('IndividualDeckView', newDeck)
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
                    <View><Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Question:</Text><TextInput onChangeText={(question) => this.setState({ question: question })} value={this.state.question} style={{ paddingLeft: 10, margin: 20, height: 50, width: 250, borderRadius: 8, borderWidth: 2 }} /></View>
                    <View><Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Answer:</Text><TextInput onChangeText={(answer) => this.setState({ answer: answer })} value={this.state.answer} style={{ paddingLeft: 10, margin: 20, height: 50, width: 250, borderRadius: 8, borderWidth: 2 }} /></View>
                    <TouchableOpacity onPress={() => this.addCard()}>
                        <View style={{ backgroundColor: 'black', margin: 20, height: 50, width: 100, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white' }}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}