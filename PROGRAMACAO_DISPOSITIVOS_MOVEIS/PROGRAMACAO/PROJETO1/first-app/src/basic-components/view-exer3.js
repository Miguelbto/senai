import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView03() {
    return (
        <View style={styles.container}>


            <View style={{flexDirection:"row", justifyContent:"space-between", gap:100}}>
                    <View style={[styles.blueBox, {height:70, width:70}]}></View>
                    <View style={[styles.redBox, {height:70, width:70}]}></View>
                    <View style={[styles.greenBox, {height:70, width:70, justifyContent:"center"}]}></View>
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
        height: 80,
        width: 80,

        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
    },
    greenBox: {
        height: 80,
        width: 80,
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
    },
    blueBox: {
        height: 80,
        width: 80,
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
    },
});