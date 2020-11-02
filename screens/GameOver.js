import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const GameOver = () => {
    return (
        <View style={styles.screen}>
            <Text>The Game Is Over</Text>
        </View>
    )
}

export default GameOver

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
