import React from "react"
import { BackHandler, Dimensions, Platform, View } from "react-native"
import { Button } from "../components/Button"
import { NavigationProp } from "@react-navigation/native"
import { routes } from "../routes"

interface HomeProps {
    navigation: NavigationProp<any, any>
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
    const maxHeight = Dimensions.get("window").height

    return (
        <View style={{ padding: 20, height: maxHeight }}>
            <View style={{ marginTop: "auto", gap: 15, alignItems: "center" }}>
                <Button mode="contained" onPress={() => navigation.navigate(routes.gallery.name)} textVariant="displayMedium">
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
