import React, { useState } from "react"
import { NavigationProp } from "@react-navigation/native"
import { Dimensions, GestureResponderEvent, ImageBackground, View } from "react-native"
import { Path, Svg } from "react-native-svg"

interface CanvasContainerProps {
    navigation: NavigationProp<any, any>
    image: number
}

export const CanvasContainer: React.FC<CanvasContainerProps> = ({ navigation, image }) => {
    const { height, width } = Dimensions.get("window")

    const [currentPath, setCurrentPath] = useState<string[]>([])
    const [paths, setPaths] = useState<string[][]>([])

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
        const newPath = currentPath

        //push new path with old path and clean current path state
        currentPaths.push(newPath)
        setPaths(currentPaths)
        setCurrentPath([])
    }

    return (
        <ImageBackground source={image}>
            <Svg height={height * 0.7} width={width * 0.9} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                <Path
                    d={currentPath.join("")}
                    stroke={"red"}
                    fill={"transparent"}
                    strokeWidth={2}
                    strokeLinejoin={"round"}
                    strokeLinecap={"round"}
                    strokeOpacity={0.5}
                />

                {paths.length > 0 &&
                    paths.map((item, index) => (
                        <Path
                            key={`path-${index}`}
                            d={item.join("")}
                            stroke={"red"}
                            fill={"transparent"}
                            strokeWidth={2}
                            strokeLinejoin={"round"}
                            strokeLinecap={"round"}
                        />
                    ))}
            </Svg>
        </ImageBackground>
    )
}
