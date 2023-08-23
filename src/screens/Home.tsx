import React from "react"
import { BackHandler, Dimensions, Platform, View, Image, ImageBackground } from "react-native"
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
        <ImageBackground source={images.background.dots}>
            <View style={{ height: maxHeight }}>
                <View style={{ padding: 20, paddingTop: 70 }}>
                    <View style={{ alignItems: "center", gap: 55 }}>
                        <Image source={images.logo} style={{ width: 240, height: 160 }} />
                        <Image source={images.theme} style={{ width: 390, height: 250 }} />
                    </View>
                </View>

                <ImageBackground
                    source={images.background.clouds}
                    style={{ height: 500, width: 420, position: "absolute", top: 440 }}
                >
                    <View style={{ gap: 15, alignItems: "center", position: "relative", top: 203 }}>
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
                </ImageBackground>
            </View>
        </ImageBackground>
    )
}
