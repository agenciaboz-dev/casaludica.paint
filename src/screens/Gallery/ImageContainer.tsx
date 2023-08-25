import { NavigationProp } from "@react-navigation/native"
import React from "react"
import { TouchableOpacity, Image, Dimensions } from "react-native"
import { routes } from "../../routes"

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

interface ImageProps {
    navigation: NavigationProp<any, any>
    image: number
}

export const ImageContainer: React.FC<ImageProps> = ({ navigation, image }) => {
    return (
        <TouchableOpacity style={{
            width: width * 0.7,
            height: height * 0.5,
            alignItems: "center",
            justifyContent: "center",
            padding: 30,
            backgroundColor: "white",
            borderRadius: 30,
        }} onPress={() => navigation.navigate(routes.draw.name, { image })}>
            <Image source={image} style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
            }} />
        </TouchableOpacity>
    )
}
