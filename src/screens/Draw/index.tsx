import { NavigationProp, RouteProp } from "@react-navigation/native"
import React, { useState } from "react"
import { Dimensions, Image, View } from "react-native"
import { Button } from "../../components/Button"
import { routes } from "../../routes"
import { Text } from "react-native-paper"
import { CanvasContainer } from "./CanvasContainer"

interface DrawProps {
    navigation: NavigationProp<any, any>
    route: RouteProp<any, any>
}

export const Draw: React.FC<DrawProps> = ({ route, navigation }) => {
    const vh = Dimensions.get("screen").height / 100
    const vw = Dimensions.get("screen").width / 100
    const baseImage = route.params?.image

    const [shouldUndo, setShouldUndo] = useState(false)

    return (
        <View style={{ padding: 20, alignItems: "center", height: 100 * vh, gap: 10 }}>
            <View style={{ flexDirection: "row", alignSelf: "flex-start", height: 5 * vh, width: 95 * vw, gap: 5 }}>
                <Button onPress={() => navigation.navigate(routes.gallery.name)} style={{ flex: 0.2 }} mode="contained">
                    Voltar
                </Button>
                <Button icon={"home"} textColor="white" onPress={() => setShouldUndo(true)} style={{ flex: 0.1 }} mode="contained">
                    .
                </Button>
                <Button onPress={() => navigation.navigate(routes.gallery.name)} style={{ flex: 0.6 }} mode="contained">
                    Compartilhar
                </Button>
            </View>
            <CanvasContainer navigation={navigation} image={baseImage} shouldUndo={shouldUndo} setShouldUndo={setShouldUndo} />
            <View style={{ flex: 0.3, backgroundColor: "blue" }}>
                <Text>oi</Text>
            </View>
        </View>
    )
}
