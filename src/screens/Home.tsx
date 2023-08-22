import React from "react"
import { Alert, BackHandler, Dimensions, Platform, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { Button } from "../components/Button"
import { Text } from "react-native-paper"
import { NavigationProp } from "@react-navigation/native"

interface HomeProps {
    navigation: NavigationProp<any, any>
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
    const maxHeight = Dimensions.get("window").height

    return (
        <View style={{ padding: 20, height: maxHeight }}>
            <View style={{ marginTop: "auto", gap: 15, alignItems: "center" }}>
                <Button mode="contained" onPress={() => navigation.navigate("gallery")} textVariant="displayMedium">
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
