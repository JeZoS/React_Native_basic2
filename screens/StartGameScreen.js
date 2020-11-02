import React, { useState } from "react";
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from "react-native";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

export default function StartGameScreen(porps) {
  const [enteredValue, setEnteredValue] = useState();
  const [confirmed, setConfirmed] = useState(false);
  const [selected, setSelected] = useState("");

  const inputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const number = parseInt(enteredValue);
    if (isNaN(number) || number <= 0 || number > 99) {
      Alert.alert("Invalid Number!", "Number has to be between 1 and 99", [
        { text: "Okay", style: "destructive", onPress: resetHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setSelected(parseInt(enteredValue));
    setEnteredValue("");
  };

  let output;
  if (confirmed) {
    output = (
      <View style={styles.inputContainer1}>
        <Text>You Selected</Text>
        <NumberContainer>{selected}</NumberContainer>
        <Button title="Let's go" onPress={()=>porps.gameScreen(selected)}/>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Star a new Game</Text>
        <View style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={inputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetHandler}
                color={Colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </View>
        {output}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 15,
    padding: 20,
    borderRadius: 10,
  },
  inputContainer1: {
    width: 150,
    maxWidth: "80%",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 15,
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
});
