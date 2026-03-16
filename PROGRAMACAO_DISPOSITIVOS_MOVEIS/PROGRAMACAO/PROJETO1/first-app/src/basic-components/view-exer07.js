import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView07() {
    return (
        <View style={styles.container}>


            <View style={{ flex:1, flexDirection:"row", gap:18}}>
                <View style={styles.redBox }></View>
                <View style={styles.greenBox }></View>
            </View>
            <View style={{ flex:1, flexDirection:"row", gap:18}}>
                    <View style={styles.blueBox}></View>
                    <View style={styles.yellowBox}></View>
            </View>




        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 18,
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
    },
    redBox: {
        flex:1,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
    },
    greenBox: {
        flex:1,
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
    },
    yellowBox: {
        flex:1,
        backgroundColor: "yellow",
        alignItems: "center",
        justifyContent: "center",
    },
    blueBox: {
        flex:1,
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
    },
});