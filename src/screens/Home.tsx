import React from "react"
import { BackHandler, Dimensions, Platform, View, Image, ImageBackground, Text } from "react-native"
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
        <ImageBackground source={images.background.cloud} style={{}}>
            <View style={{ padding: 20, height: maxHeight, paddingTop: 60, paddingBottom: 40 }}>
                <View style={{ backgroundColor: "transparent", alignItems: "center", gap: 50 }}>
                    <Image source={images.logo} style={{ width: 250, height: 170 }} />
                    <Image source={images.theme} style={{ width: 400, height: 250 }} />
                </View>
                <View style={{ marginTop: "auto", gap: 15, alignItems: "center" }}>
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
        </ImageBackground>
    )
}
