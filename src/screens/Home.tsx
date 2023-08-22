import React from "react"
import { Alert, Dimensions, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { Button } from "../components/Button"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const vw = Dimensions.get("window").height / 100
    return (
        <View style={{ padding: 50 }}>
            <Button mode="contained" onPress={() => Alert.alert("oi")}>
                oi
            </Button>
        </View>
    )
}
