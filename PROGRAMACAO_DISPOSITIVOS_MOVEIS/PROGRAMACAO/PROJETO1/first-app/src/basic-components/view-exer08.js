import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView08() {
    return (
        <View style={styles.container}>

            {/* Lado Esquerdo: Sidebar */}
            <View style={styles.redBox}>
                <Text style={styles.textStyle}>Sidebar</Text>
            </View>
                
            {/* Lado Direito: Cards empilhados (Sem flexDirection: "row" aqui!) */}
            <View style={{ flex: 2, gap: 18 }}>
                <View style={styles.greenBox}>
                    <Text style={styles.textStyle}>Card 1</Text>
                </View>
                <View style={styles.yellowBox}>
                    <Text style={styles.textStyle}>Card 2</Text>
                </View>
                <View style={styles.blueBox}>
                    <Text style={styles.textStyle}>Card 3</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row", 
        gap: 18,
        padding: 18,          
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
    },
    redBox: {
        flex: 1,
        backgroundColor: "gray", 
        alignItems: "center",
        justifyContent: "center",
    },
    greenBox: {
        flex: 1,
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
    },
    yellowBox: {
        flex: 1,
        backgroundColor: "#FFB300", 
        alignItems: "center",
        justifyContent: "center",
    },
    blueBox: {
        flex: 1,
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
    },
});