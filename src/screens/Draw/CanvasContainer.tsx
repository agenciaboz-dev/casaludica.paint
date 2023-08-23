import React, { useEffect, useState } from "react"
import { NavigationProp } from "@react-navigation/native"
import { ColorValue, Dimensions, GestureResponderEvent, ImageBackground, View } from "react-native"
import { Path, Svg } from "react-native-svg"

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
        <ImageBackground source={image}>
            <Svg height={height * 0.7} width={width * 0.9} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                <Path
                    d={currentPath.join("")}
                    stroke={updateColor}
                    fill={"transparent"}
                    strokeWidth={stroke}
                    strokeLinejoin={"round"}
                    strokeLinecap={"round"}
                    strokeOpacity={0.5}
                />

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
                        />
                    ))}
            </Svg>
        </ImageBackground>
    )
}
