import React, { useEffect, useState } from "react"
import { NavigationProp } from "@react-navigation/native"
import { ColorValue, Dimensions, GestureResponderEvent, Image, Platform, Touchable, View } from "react-native"
import { Path, Rect, Svg } from "react-native-svg"

interface CanvasContainerProps {
    navigation: NavigationProp<any, any>
    image: number
    shouldUndo: boolean
    setShouldUndo: (value: boolean) => void
    updateColor: ColorValue
    stroke: number
}

export const CanvasContainer: React.FC<CanvasContainerProps> = ({ navigation, image, shouldUndo, setShouldUndo, updateColor, stroke }) => {
    const { height, width } = Dimensions.get("window")
    const imageHeight = height * 0.7
    const imageWidth = width * 0.9

    const [currentPath, setCurrentPath] = useState<string[]>([])
    const [paths, setPaths] = useState<{ path: string[]; color: ColorValue; stroke: number }[]>([])

    const onTouchMove = (event: GestureResponderEvent) => {
        const newPath = [...currentPath]

        //get current user touches position
        const locationX = event.nativeEvent.locationX
        const locationY = event.nativeEvent.locationY

        // create new point
        const newPoint = `${newPath.length === 0 ? "M" : ""}${locationX.toFixed(0)},${locationY.toFixed(0)} `

        // add the point to older points
        newPath.push(newPoint)
        setCurrentPath(newPath)
    }

    const onTouchEnd = (event: GestureResponderEvent) => {
        const currentPaths = [...paths]
        const newPath = { path: currentPath, color: updateColor, stroke }

        //push new path with old path and clean current path state
        currentPaths.push(newPath)
        setPaths(currentPaths)
        setCurrentPath([])
    }

    const undo = () => {
        setPaths((paths) => paths.slice(0, -1))
    }

    useEffect(() => {
        if (shouldUndo) {
            undo()
            setShouldUndo(false)
        }
    }, [shouldUndo])

    useEffect(() => {
        console.log(updateColor)
    }, [updateColor])

    return (
        <View style={{ position: "relative" }}>
            <Svg height={imageHeight} width={imageWidth} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                {Platform.OS == "ios" && <Rect width={imageWidth} height={imageHeight} fill={"white"} />}
                {paths.length > 0 &&
                    paths.map((item, index) => (
                        <Path
                            key={`path-${index}`}
                            d={item.path.join("")}
                            stroke={item.color}
                            fill={"transparent"}
                            strokeWidth={item.stroke}
                            strokeLinejoin={"round"}
                            strokeLinecap={"round"}
                            strokeOpacity={1}
                        />
                    ))}
                <Path
                    d={currentPath.join("")}
                    stroke={updateColor}
                    fill={"transparent"}
                    strokeWidth={stroke}
                    strokeLinejoin={"round"}
                    strokeLinecap={"round"}
                    strokeOpacity={1}
                />
            </Svg>
            <View style={{ position: "absolute", height: imageHeight, width: imageWidth, top: 0, left: 0 }} pointerEvents="none">
                <Image source={image} style={{ height: imageHeight, width: imageWidth, resizeMode: "contain" }} />
            </View>
        </View>
    )
}
