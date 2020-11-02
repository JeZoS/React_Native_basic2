import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";

const generateRandom = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndnm = Math.floor(Math.random() * (max - min)) + min;
  if (rndnm === exclude) {
    return generateRandom(min, max, exclude);
  } else {
    return rndnm;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setcurrentGuess] = useState(
    generateRandom(1, 100, props.userChoice)
  );
  const currentLow = useRef(1)
  const currentHigh = useRef(100)  

  /* useEffect(()=>{
      if (currentGuess === props.userChoice)
        break
  }) */

  const nextGuess = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Dont Lie Brahhhhh", "You know that this is wrong....", [
        {
          text: "Sorry!",
          style: "cancel",
        },
      ]);
      return ;
    }
    if (direction === 'lower'){
        currentHigh.current=currentGuess;
    }
    else{
        currentLow.current=currentGuess 
    }
    setcurrentGuess(generateRandom(currentLow.current,currentHigh.current,props.userChoice))
  };
  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.inputContainer}>
        <Text>The Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="LOWER"
              onPress={nextGuess.bind(this,'lower')}
              color={Colors.accent}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="GREATER"
              onPress={nextGuess.bind(this,'greater')}
              color={Colors.primary}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    backgroundColor: "white",
    elevation: 15,
    width: "100%",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  button: {
    width: 100,
    margin: 10,
  },
});
