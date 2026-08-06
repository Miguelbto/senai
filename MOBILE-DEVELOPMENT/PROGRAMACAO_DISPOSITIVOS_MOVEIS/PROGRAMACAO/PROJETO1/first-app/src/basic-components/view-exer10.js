import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView10() {
    return (
        <View style={styles.container}>

          
            <View style={styles.header}>
                <Text style={styles.textStyle}>Header</Text>
            </View>

            
            <View style={styles.content}>
                
                
                <View style={styles.rowTop}>
                    <View style={styles.redBox}><Text style={styles.textStyle}>1</Text></View>
                    <View style={styles.blueBox}><Text style={styles.textStyle}>2</Text></View>
                    <View style={styles.yellowBox}><Text style={styles.textStyle}>3</Text></View>
                </View>

                
                <View style={styles.rowBottom}>
                    <View style={styles.mainPanel}>
                        <Text>Painel Principal</Text>
                    </View>
                    <View style={styles.sidePanel}>
                        <Text>Lateral</Text>
                    </View>
                </View>

            </View>

            
            <View style={styles.footer}>
                <Text style={styles.textStyle}>Footer</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%", 
        backgroundColor: "white",
        gap: 10,
        padding: 10, 
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
    },

    header: {
        height: 60, 
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    content: {
        flex: 1, 
        gap: 10,
    },
    footer: {
        height: 60, 
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },

    rowTop: {
        flexDirection: "row",
        height: 100, 
        gap: 10,
    },
    redBox: {
        flex: 1, 
        backgroundColor: "red",
        alignItems: "center", 
        justifyContent: "center", 
        borderRadius: 5,
    },
    blueBox: {
        flex: 1, 
        backgroundColor: "blue", 
        alignItems: "center", 
        justifyContent: "center", 
        borderRadius: 5,
    },
    yellowBox: {
        flex: 1, 
        backgroundColor: "yellow", 
        alignItems: "center", 
        justifyContent: "center", 
        borderRadius: 5,
    },

    rowBottom: { 
        flex: 1, 
        flexDirection: "row",
        gap: 10,
    },
    mainPanel: {
        flex: 2, 
        backgroundColor: "pink",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    sidePanel: {
        flex: 1, 
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
});