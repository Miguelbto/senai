import { StyleSheet, Text, View } from "react-native";

export default function ExercicioViewAva() {
    return (
        <View style={styles.container}>

          
            <View style={styles.header}>
                <View style={styles.rowTop}>
                    <View style={styles.blueBox}><Text style={styles.textStyle}>azul</Text></View>
                    <View style={styles.yellowBox}><Text style={styles.textStyle}>amarelo</Text></View>
            </View>
            </View>

            
            <View style={styles.content}>
                
                
                <View style={styles.rowBottom}>
                    <View style={styles.blackBox}>
                        <Text>Painel Principal</Text>
                    </View>

                    <View style={styles.mainColunm}>
                        <View style={styles.pinkBox}>
                        <Text>rosa</Text>
                        </View>

                        <View style={styles.orangeBox}>
                        <Text>larananja</Text>
                        </View>
                    </View>

                
                    
                </View>

                

            </View>

            
    

            <View style={styles.rowTop}>
                    <View style={styles.redBox}><Text style={styles.textStyle}>vermelho</Text></View>
                    <View style={styles.brownBox}><Text style={styles.textStyle}>marrom</Text></View>
                    <View style={styles.violetBox}><Text style={styles.textStyle}>violeta</Text></View>
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

    top: {
        flexDirection: "row",
        height: 100, 
        gap: 8,
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
        flex: 3, 
        backgroundColor: "yellow", 
        alignItems: "center", 
        justifyContent: "center", 
        borderRadius: 5,
    },

    orangeBox: {
        flex: 1, 
        backgroundColor: "orange", 
        alignItems: "center", 
        justifyContent: "center", 
        borderRadius: 5,
    },

    brownBox: {
        flex: 1,
        backgroundColor: "brown", 
        alignItems: "center", 
        justifyContent: "center", 
        borderRadius: 5,
    },

    violetBox: {
        flex: 1,
        backgroundColor: "blueviolet", 
        alignItems: "center", 
        justifyContent: "center", 
        borderRadius: 5,
    },

    grayBox: {
        flex: 1, 
        backgroundColor: "gray",
        alignItems: "center", 
        justifyContent: "center", 
        borderRadius: 5,
    },

    rowBottom: { 
        flex: 1, 
        flexDirection: "row",
        gap: 8,
    },

    mainColunm: { 
        flex: 1, 
        flexDirection: "column",
        gap: 8,
    },
    blackBox: {
        flex: 1, 
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        color:"white",
    },
    pinkBox: {
        flex: 1, 
        backgroundColor: "pink",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
});