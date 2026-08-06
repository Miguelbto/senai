import { useState } from "react"
import { TextInput, View, Alert, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native"

export default function CardItem({nome, nota}) {

    return (

        <View style={styles.linha}>
            <Text>{nome}</Text>
            <Text style={{ fontWeight: "bold"}}>{nota}</Text>
        </View>
        
    )
}

```

Exemplo CardItem
```
const styles = StyleSheet.create({
linha: {
flexDirection: "row",
justifyContent: "space-between",
padding: 10,
backgroundColor: "#d7e7f8",
marginBottom: 4,
borderRadius: 4,
},
});