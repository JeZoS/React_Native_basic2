import { StatusBar } from "expo-status-bar";
import React,{useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from './components/Header'
import GameScreen from "./screens/GameScreen";
import StartGameScreen from './screens/StartGameScreen'
import GameOver from './screens/GameOver'

export default function App() {
  const [userNumber, setuserNumber] = useState()
  const [guseeRounds, setguseeRounds] = useState()

  

  const startGameHandler = Num => {
    setuserNumber(Num)
  }

  let content=<StartGameScreen gameScreen={startGameHandler} />

  if (userNumber){
    content = <GameScreen userChoice={userNumber} style={{alignItems:'center',justifyContent:'center'}}/>
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1
  }
});
