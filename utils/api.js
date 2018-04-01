import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo'
const KEY = "mobile-flashcards:decks"
const NOTIFICATION_KEY = 'mobile-flashcards:notifications'

export function setData() {
  const data = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  };

  AsyncStorage.setItem(KEY, JSON.stringify(data));
}

export function getDecks() {
  return AsyncStorage.getItem(KEY).then(result => {
    return result === null ? setData() : JSON.parse(result)
  });
}

export async function addDeck(deckTitle) {
  const decks = await AsyncStorage.getItem(KEY)
  const parsedDecks = JSON.parse(decks)
  const newDecks = {...parsedDecks}
  newDecks[deckTitle] = {
    title: deckTitle,
    questions: []
  }
  const mergedItem = JSON.stringify(newDecks);
  await AsyncStorage.mergeItem(KEY, mergedItem);
  const newState = await AsyncStorage.getItem(KEY)
  return JSON.parse(newState)
}

export async function addCardToDeck(deckTitle, card) {
  const decks = await AsyncStorage.getItem(KEY)
  const parsedDecks = JSON.parse(decks)
  const questions = parsedDecks[deckTitle].questions
  questions.push(card)
  const newQuestions = {
    [deckTitle]: {
      questions: questions,
      title: deckTitle
    }
  }
  const mergedItem = JSON.stringify(newQuestions);
  await AsyncStorage.mergeItem(KEY, mergedItem);
  const newState = await AsyncStorage.getItem(KEY)
  return JSON.parse(newState)
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Expo.Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Quiz reminder!',
    body: "👋 don't forget to complete a quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Expo.Notifications.cancelAllScheduledNotificationsAsync()
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)
              
              Expo.Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
  
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}