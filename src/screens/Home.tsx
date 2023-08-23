import React from "react"
import { BackHandler, Dimensions, Platform, View, Image } from "react-native"
import { Button } from "../components/Button"
import { NavigationProp } from "@react-navigation/native"
import { routes } from "../routes"
import images from "./Gallery/images"

interface HomeProps {
    navigation: NavigationProp<any, any>
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
    const maxHeight = Dimensions.get("window").height

    return (
        <View style={{ padding: 20, height: maxHeight, backgroundColor: "red" }}>
            <View style={{ backgroundColor: "transparent" }}>
                <Image source={images.logo} style={{ width: 200, height: 150 }} />
            </View>
            <View style={{ marginTop: "auto", gap: 15, alignItems: "center", backgroundColor: "green" }}>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate(routes.gallery.name)}
                    textVariant="displayMedium"
                >
                    Catalogo
                </Button>
                {Platform.OS != "ios" && (
                    <Button mode="contained" onPress={() => BackHandler.exitApp()} textVariant="headlineSmall">
                        Sair
                    </Button>
                )}
            </View>
        </View>
    )
}
