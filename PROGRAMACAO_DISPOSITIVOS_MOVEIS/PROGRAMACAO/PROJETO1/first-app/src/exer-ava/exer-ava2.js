import { StyleSheet, Text, View } from "react-native";

export default function ExercicioViewAva2() {
    return (
        <View style={styles.container}>

          
            <View style={styles.header}>
                <Text style={styles.textStyle}>Header</Text>
            </View>

            
            <View style={styles.content}>

                
                <View style={styles.rowBottom}>

                     <View style={styles.sidePanel}>
                        <Text> Painel lateral </Text>
                    </View>

                    <View style={styles.mainPanel}>

                        <View style={styles.topPanel}>
                            <View style={styles.greenBox}><Text >Verde</Text></View>
                            <View style={styles.blueBox}><Text >Azul</Text></View>
                        </View>
                        <View style={styles.midPanel}>
                            <Text style={styles.midcirlar}></Text>
                        </View>
                        <View style={styles.bottomPanel}>
                            <View style={styles.redBox}><Text >vermelho</Text></View>
                            <View style={styles.orangeBox}><Text >laranja</Text></View>

                            <View style={styles.violetBox}><Text >roxo</Text></View>
                        </View>
                        
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
        backgroundColor: "#2c3e50",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    content: {
        flex: 1, 
        gap: 10,
    },
    footer: {
        height: 50, 
        backgroundColor: "#2c3e50",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
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
        gap: 8,
        padding:8,
        backgroundColor: "#1a1a1a"
    },
    mainPanel: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        flexDirection:"column",
    },

    topPanel: {
        flex: 1,
        flexDirection:"row",
        padding:8,
        gap:8,

    },

    midPanel: {
        gap:8,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },

    midcirlar: {
        width:50,
        height:50, 
        backgroundColor: "#34495e",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        alignSelf:"center",
    },

    bottomPanel: {
        flex: 1, 
        flexDirection:"row",
        gap:8,
        padding:8,
    },
    sidePanel: {
        width:80,
        backgroundColor: "#95a5a6",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },

    orangeBox: {
        flex: 3, 
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

    blackBox: {
        flex: 1, 
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        color:"white",
    },
    greenBox: {
        flex: 1, 
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
});