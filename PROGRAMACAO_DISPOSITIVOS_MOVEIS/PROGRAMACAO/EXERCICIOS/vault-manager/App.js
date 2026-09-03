import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { initDatabase } from './src/database/init'
import AppNavigator from './src/navigation/AppNavigator'


export default function App() {

    const [dbPronto, setDbPronto ] = useState(false)

    useEffect(() => {
        async function setUp() {
            try {
                await initDatabase()
                setDbPronto(true)
            } catch (error) {
                console.error('Erro ao inicializar banco de dados', error)
            }
        }
        setUp()
    }, [])

    if (!dbPronto) {
        return(
            <View style={styles.loadingData}>
                <ActivityIndicator size='large' color='#6366F1' />
                <Text style={styles.subtitle}></Text>
            </View>
        )
    }

    return (
        <AppNavigator />
    )
}

const styles = StyleSheet.create({

    loadingData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontSize: 18, fontWeight: 'bold'
    },

    subTitle: {
        color: 'green', marginTop: 5
    }
})