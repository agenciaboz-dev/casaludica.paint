import { NavigationProp } from "@react-navigation/native"
import React from "react"
import { TouchableOpacity, Image, Dimensions } from "react-native"

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

interface ImageProps {
    navigation: NavigationProp<any, any>
    image: number
}

export const ImageContainer: React.FC<ImageProps> = ({ navigation, image }) => {
    return (
        <TouchableOpacity
            style={{
                width: width * 0.6,
                height: height * 0.4,
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
                backgroundColor: "white",
                borderRadius: 30
            }}
            onPress={() => navigation.navigate("draw", { image })}
        >
            <Image
                source={image}
                style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                }}
            />
        </TouchableOpacity>
    )
}
