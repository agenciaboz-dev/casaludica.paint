import { NavigationProp } from "@react-navigation/native"
import React from "react"
import { TouchableOpacity, Image } from "react-native"
import { routes } from "../../routes"

interface ImageProps {
    navigation: NavigationProp<any, any>
    image: number
}

export const ImageContainer: React.FC<ImageProps> = ({ navigation, image }) => {
    return (
        <TouchableOpacity style={{}} onPress={() => navigation.navigate(routes.draw.name, { image })}>
            <Image source={image} style={{ width: 330, height: 450, resizeMode: "contain", backgroundColor: "white" }} />
        </TouchableOpacity>
    )
}
