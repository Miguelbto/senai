import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView05() {
    return (
        <View style={styles.container}>


            <View style={{flexDirection:"row", flex:1, justifyContent:"space-between", gap:5}}>
                <View style={[styles.blueBox, {flex:1}]}></View>
                <View style={[styles.greenBox, {flex:1}]}></View>
                </View>




        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        gap: 18,
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
    },
    redBox: {
        height: "auto",
        width: "auto",

        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
    },
    greenBox: {
        height: "auto",
        width: "auto",
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
    },
    blueBox: {
        height: "auto",
        width: "auto",
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
    },
});