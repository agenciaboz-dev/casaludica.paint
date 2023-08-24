import { NavigationProp, RouteProp } from "@react-navigation/native"
import React, { useState } from "react"
import { Dimensions, Image, View } from "react-native"
import { Button as PaperButton } from "../../components/Button"
import { routes } from "../../routes"
import { Button, IconButton, Text } from "react-native-paper"
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
        <View style={{ padding: 0, alignItems: "center", height: "100%", gap: 10, paddingTop: 20 }}>
            <View
                style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    justifyContent: "space-between",
                    height: 5 * vh,
                    width: 95 * vw,
                    gap: 6,
                }}
            >
                <PaperButton
                    onPress={() => navigation.navigate(routes.gallery.name)}
                    style={{ flex: 0.5, paddingHorizontal: 0 }}
                    textStyle={{ fontSize: 21, padding: 0 }}
                    mode="contained"
                >
                    Voltar
                </PaperButton>
                <PaperButton
                    icon={"undo"}
                    textColor="white"
                    onPress={() => setShouldUndo(true)}
                    style={{}}
                    mode="contained"
                ></PaperButton>
                <PaperButton
                    onPress={() => navigation.navigate(routes.gallery.name)}
                    style={{ flex: 0.5, paddingHorizontal: 0 }}
                    mode="contained"
                    disabled
                >
                    Compartilhar
                </PaperButton>
            </View>
            <CanvasContainer
                navigation={navigation}
                image={baseImage}
                shouldUndo={shouldUndo}
                setShouldUndo={setShouldUndo}
                updateColor={updateColor}
                stroke={stroke}
            />
            <View
                style={{
                    backgroundColor: "#1B1D50",
                    width: 100 * vw,
                    flex: 1,
                    padding: 16,
                    paddingBottom: 16,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    gap: 10,
                }}
            >
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center", gap: 10 }}>
                    <Text style={{ color: "white", flex: 0.1 }}>{stroke.toFixed(0)}</Text>

                    <Slider
                        value={stroke}
                        onValueChange={(value) => setStroke(value[0])}
                        maximumValue={100}
                        minimumValue={1}
                        containerStyle={{ backgroundColor: "transparent", flex: 0.6 }}
                        thumbStyle={{ backgroundColor: "#FF7C0A" }}
                        trackStyle={{ backgroundColor: "#6022FC" }}
                        minimumTrackTintColor="white"
                    />
                    <PaperButton
                        onPress={() => {}}
                        style={{ flex: 0.3 }}
                        textStyle={{ padding: 0, fontSize: 3 * vw }}
                        mode="contained"
                    >
                        Borracha
                    </PaperButton>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: "#3A3D80",
                        flex: 4,
                        flexWrap: "wrap",
                        gap: 5,
                        justifyContent: "center",
                        padding: 5,
                        borderRadius: 20,
                    }}
                >
                    {drawingColors.map((color) => (
                        <Svg key={color} width={30} height={30} onPress={() => setUpdateColor(color)}>
                            <Circle
                                fill={color}
                                cx={15}
                                cy={15}
                                r={14}
                                stroke={"black"}
                                strokeWidth={updateColor == color ? 2 : 0}
                            />
                        </Svg>
                    ))}

                    <Button icon="plus-circle-outline" textColor={"white"} style={{}}>
                        <></>
                    </Button>
                </View>
            </View>
        </View>
    )
}
