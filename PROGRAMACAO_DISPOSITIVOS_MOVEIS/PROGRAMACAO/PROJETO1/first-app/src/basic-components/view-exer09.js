import { StyleSheet, View } from "react-native";

export default function ExercicioView09() {
    return (
        
        <View style={styles.container}>

            
            <View style={styles.trafficLightBox}>
                
                
                <View style={styles.redLight}></View>
                <View style={styles.yellowLight}></View>
                <View style={styles.greenLight}></View>
                
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5", 
        alignItems: "center",       
        justifyContent: "center",   
    },

    trafficLightBox: {
        backgroundColor: "black",
        padding: 20,                       
        alignItems: "center",              
        justifyContent: "space-evenly",   
        borderRadius: 20,                
        height: 350,                    
        width: 130,  
    },                      


    redLight: {
        height: 80,
        width: 80,
        borderRadius: 40, 
        backgroundColor: "red",
    },
    yellowLight: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: "yellow",
    },
    greenLight: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: "green",
    },
});