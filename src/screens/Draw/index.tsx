import { NavigationProp, RouteProp } from "@react-navigation/native"
import React, { useCallback, useRef, useState } from "react"
import { Alert, Dimensions, Image, Modal, Share, View } from "react-native"
import { Button, Text } from "react-native-paper"
import { CanvasContainer } from "./CanvasContainer"
import { drawingColors } from "./drawingColors"
import { Circle, Svg } from "react-native-svg"
import { Slider } from "@miblanchard/react-native-slider"
import { colors } from "../../style/colors"
import ViewShot, { captureRef } from "react-native-view-shot"
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"
import ColorPicker, { Swatches, Preview, OpacitySlider, HueSlider, Panel3, BrightnessSlider } from "reanimated-color-picker"

interface DrawProps {
    navigation: NavigationProp<any, any>
    route: RouteProp<any, any>
}

export const Draw: React.FC<DrawProps> = ({ route, navigation }) => {
    const vh = Dimensions.get("screen").height / 100
    const vw = Dimensions.get("screen").width / 100
    const baseImage = route.params?.image
    const shotRef = useRef(null)

    const maxHeight = Dimensions.get("window").height
    const maxWidth = Dimensions.get("window").height

    const [shouldUndo, setShouldUndo] = useState(false)
    const [updateColor, setUpdateColor] = useState(drawingColors[0])
    const [stroke, setStroke] = useState(50)
    const [status, requestPermission] = MediaLibrary.usePermissions()
    const [showModal, setShowModal] = useState(false)

    const save = useCallback(async () => {
        console.log({ status })
        if (!status?.granted) {
            await requestPermission()
        }

        const uri = await captureRef(shotRef, {
            format: "jpg",
            quality: 1,
            result: "tmpfile",
        })
        await MediaLibrary.saveToLibraryAsync(uri)
        await Sharing.shareAsync(uri)
    }, [status])

    return (
        <View style={{ padding: 0, alignItems: "center", height: "100%", gap: 10, paddingTop: 20 }}>
            <View
                style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    justifyContent: "space-between",
                    //height: 4 * vh,
                    width: 95 * vw,
                    gap: 6,
                }}
            >
                <Button
                    onPress={() => navigation.navigate("gallery")}
                    style={{ flex: 0.5 }}
                    labelStyle={{ fontSize: 17, padding: 0 }}
                    buttonColor={colors.primary}
                    textColor="white"
                >
                    Voltar
                </Button>
                <Button
                    icon={"undo"}
                    textColor="white"
                    onPress={() => setShouldUndo(true)}
                    style={{}}
                    buttonColor={colors.primary}
                >
                    <></>
                </Button>
                <Button
                    onPress={() => save()}
                    style={{ flex: 0.5, paddingHorizontal: 0 }}
                    buttonColor={colors.primary}
                    textColor="white"
                    labelStyle={{ fontSize: 13, padding: 0 }}
                >
                    Compartilhar
                </Button>
            </View>
            <ViewShot ref={shotRef} style={{ backgroundColor: "white" }}>
                <CanvasContainer
                    navigation={navigation}
                    image={baseImage}
                    shouldUndo={shouldUndo}
                    setShouldUndo={setShouldUndo}
                    updateColor={updateColor}
                    stroke={stroke}
                />
            </ViewShot>
            <View
                style={{
                    backgroundColor: "#1B1D50",
                    width: 100 * vw,
                    flex: 1,
                    padding: 16,
                    paddingBottom: 16,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    gap: 12,
                }}
            >
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center", gap: 10 }}>
                    <Text style={{ color: "white", flex: 0.15, textAlign: "center" }}>{stroke.toFixed(0)}</Text>

                    <Slider
                        value={stroke}
                        onValueChange={(value) => setStroke(value[0])}
                        maximumValue={100}
                        minimumValue={1}
                        containerStyle={{ backgroundColor: "transparent", flex: 1 }}
                        thumbStyle={{ backgroundColor: colors.primary }}
                        trackStyle={{ backgroundColor: "#6022FC" }}
                        minimumTrackTintColor="white"
                    />
                    <Button
                        buttonColor={colors.primary}
                        labelStyle={{ fontSize: 10, color: "white" }}
                        textColor={"white"}
                        style={{ width: 80, height: 35 }}
                        onPress={() => setUpdateColor("white")}
                    >
                        Borracha
                    </Button>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: colors.secondary,
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
                                r={3.5 * vw}
                                stroke={"black"}
                                strokeWidth={updateColor == color ? 2 : 0}
                            />
                        </Svg>
                    ))}

                    <Button
                        icon="plus-circle-outline"
                        textColor={"white"}
                        style={{}}
                        contentStyle={{}}
                        onPress={() => setShowModal(true)}
                    >
                        <></>
                    </Button>
                </View>
            </View>
            <Modal visible={showModal} animationType="slide" transparent>
                <View style={{ width: "100%", height: "90%", justifyContent: "center", alignItems: "center" }}>
                    <View
                        style={{
                            width: "68%",
                            backgroundColor: "#1B1D50",
                            padding: 25,
                            borderRadius: 20,
                            gap: 12,
                        }}
                    >
                        <ColorPicker
                            style={{ width: "100%", gap: 15 }}
                            value={updateColor}
                            onComplete={(colors) => setUpdateColor(colors.hex)}
                        >
                            <View style={{ backgroundColor: colors.secondary, gap: 13, padding: 22, borderRadius: 20 }}>
                                <Panel3 />
                                <OpacitySlider />
                                <BrightnessSlider />
                            </View>
                            <View style={{ flexDirection: "row", width: "100%", gap: 6 }}>
                                <View style={{ backgroundColor: updateColor, width: 25, borderRadius: 50 }} />
                                <Preview hideInitialColor style={{ width: "85%" }} />
                            </View>
                        </ColorPicker>
                        <Button
                            buttonColor={colors.primary}
                            textColor="white"
                            style={{ width: "100%" }}
                            onPress={() => setShowModal(false)}
                        >
                            ok
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
