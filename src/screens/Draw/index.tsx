import { NavigationProp, RouteProp } from "@react-navigation/native"
import React, { useState } from "react"
import { Dimensions, Image, View } from "react-native"
import { Button } from "../../components/Button"
import { routes } from "../../routes"
import { Text } from "react-native-paper"
import { CanvasContainer } from "./CanvasContainer"
import { drawingColors } from "./drawingColors"
import { Circle, Svg } from "react-native-svg"
import { Slider } from "@miblanchard/react-native-slider"

interface DrawProps {
    navigation: NavigationProp<any, any>
    route: RouteProp<any, any>
}

export const Draw: React.FC<DrawProps> = ({ route, navigation }) => {
    const vh = Dimensions.get("screen").height / 100
    const vw = Dimensions.get("screen").width / 100
    const baseImage = route.params?.image

    const [shouldUndo, setShouldUndo] = useState(false)
    const [updateColor, setUpdateColor] = useState(drawingColors[0])
    const [stroke, setStroke] = useState(2)

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
            <CanvasContainer
                navigation={navigation}
                image={baseImage}
                shouldUndo={shouldUndo}
                setShouldUndo={setShouldUndo}
                updateColor={updateColor}
                stroke={stroke}
            />
            <View style={{ backgroundColor: "blue", width: 100 * vw, flex: 1, padding: 10 }}>
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center", gap: 10 }}>
                    <Text>{stroke.toFixed(0)}</Text>
                    <Slider
                        value={stroke}
                        onValueChange={(value) => setStroke(value[0])}
                        maximumValue={80}
                        minimumValue={1}
                        containerStyle={{ backgroundColor: "red", flex: 1 }}
                        thumbStyle={{ backgroundColor: "purple" }}
                        trackStyle={{ backgroundColor: "red" }}
                    />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: "yellow",
                        flex: 4,
                        flexWrap: "wrap",
                        gap: 5,
                        justifyContent: "center",
                        padding: 5,
                    }}
                >
                    {drawingColors.map((color) => (
                        <Svg width={30} height={30} onPress={() => setUpdateColor(color)}>
                            <Circle fill={color} cx={15} cy={15} r={15} />
                        </Svg>
                    ))}
                </View>
            </View>
        </View>
    )
}
