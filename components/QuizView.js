import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { clearLocalNotification, setLocalNotifications } from "../utils/api";

class QuizView extends React.Component {

    state = {
        questions: "",
        correctAnswers: 0,
        currentQuestion: 0,
        showAnswer: false
    }

    questions = [];
    slideNumber = 0;
    questionsNumber = 0;
    nextSlide = 0;

    componentDidMount() {
        const resultView = {
            "answer": "resultView"
        };
        ;
        if (this.questions.length === 0) {
            this.questions = [...this.props.navigation.state.params.questions];
            this.questionsNumber = this.questions.length;
            this.questions.push(resultView)
            this.setState({ questions: this.questions })
        }
    }

    answerHandler(answer) {
        this.nextSlide++
        if (this.nextSlide <= this.questionsNumber) {
            this.setState({ currentQuestion: this.nextSlide })
        }
        if (answer === "correct") {
            let newScore = this.state.correctAnswers;
            newScore++;
            this.setState({ correctAnswers: newScore })
        }
    }

    render() {
        if (this.questions.length > 0) {
            if (this.nextSlide === this.questionsNumber) {
                return (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20 }}>{this.state.correctAnswers / this.questionsNumber * 100}% Correct answers</Text>
                            <TouchableOpacity onPress={() => {
                                clearLocalNotification().then(setLocalNotifications)
                                this.props.navigation.navigate('QuizView', this.props.navigation.state.params)}}>

                                <View style={{ backgroundColor: 'white', margin: 20, height: 50, width: 200, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black' }}>Restart Quiz</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('IndividualDeckView', this.props.navigation.state.params)}>
                                <View style={{ backgroundColor: 'black', margin: 20, height: 50, width: 200, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white' }}>Back to Deck</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
            else {
                if (this.state.showAnswer === false) {
                    return (
                        <View key={this.questions[this.state.currentQuestion].question} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                                <Text style={{ fontSize: 25, textAlign: 'center' }}>({(this.state.currentQuestion + 1)}/{this.questionsNumber}) {this.questions[this.state.currentQuestion].question}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.setState({ showAnswer: true })}>
                                <View style={{ marginTop: 20, marginBottom: 10 }}><Text style={{ fontSize: 20, color: 'red' }}>Answer</Text></View>
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.answerHandler("correct")}>

                                    <View style={{ backgroundColor: 'green', margin: 20, height: 50, width: 200, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'white' }}>Correct</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.answerHandler("incorrect")}>

                                    <View style={{ backgroundColor: 'red', margin: 20, height: 50, width: 200, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'white' }}>Incorrect</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
                else {
                    return (
                        <View key={this.questions[this.state.currentQuestion].question} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                                <Text style={{ fontSize: 25, textAlign: 'center' }}>{this.questions[this.state.currentQuestion].answer}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.setState({ showAnswer: false })}>
                                <View style={{ marginTop: 20, marginBottom: 10 }}><Text style={{ fontSize: 20, color: 'red' }}>question</Text></View>
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.answerHandler("correct")}>

                                    <View style={{ backgroundColor: 'green', margin: 20, height: 50, width: 200, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'white' }}>Correct</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.answerHandler("incorrect")}>

                                    <View style={{ backgroundColor: 'red', margin: 20, height: 50, width: 200, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'white' }}>Incorrect</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            }
        }
        else {
            return null
        }
    }
}

export default QuizView