import React from "react"
import { Alert, BackHandler, Dimensions, Platform, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { Button } from "../components/Button"
import { Text } from "react-native-paper"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const maxHeight = Dimensions.get("window").height

    return (
        <View style={{ padding: 20, height: maxHeight }}>
            <View style={{ marginTop: "auto", gap: 15, alignItems: "center" }}>
                <Button mode="contained" onPress={() => Alert.alert("oi")} textVariant="displayMedium">
                    Catalogo
                </Button>
                {Platform.OS != "ios" && (
                    <Button mode="contained" onPress={() => BackHandler.exitApp()} textVariant="labelLarge">
                        Sair
                    </Button>
                )}
            </View>
        </View>
    )
}
