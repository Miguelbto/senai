import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView06() {
    return (
        <View style={styles.container}>


            <View style={{ flex:1}}>
                    <View style={[styles.blueBox, {height:50}]}><Text>Header</Text></View>
                    <View style={[styles.redBox, {flex:1}]}><Text style={{textAlign:"center"}}>main</Text></View>
                    <View style={[styles.greenBox, {height:60}]}><Text >footers</Text></View>
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
        height: "auto",
        width: "auto",

        backgroundColor: "red",
    },
    greenBox: {
        height: 80,
        width: "auto",
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
    },
    blueBox: {
        height: 80,
        width: "auto",
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
    },
});