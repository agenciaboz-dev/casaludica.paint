import React from "react"
import { Alert, Dimensions, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { Button } from "../components/Button"
import { Text } from "react-native-paper"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const vw = Dimensions.get("window").height / 100
    return (
        <View style={{ padding: 20 }}>
            <Button mode="contained" onPress={() => Alert.alert("oi")}>
                Catalogo
            </Button>
        </View>
    )
}
