import React from "react"
import { Dimensions, FlatList, Image, ImageBackground, TouchableOpacity, View } from "react-native"
import { Avatar, Text } from "react-native-paper"
import images from "./images"
import { Button } from "../../components/Button"
import { NavigationProp } from "@react-navigation/native"
import { routes } from "../../routes"
import { ImageContainer } from "./ImageContainer"
import { colors } from "../../style/colors"

interface GalleryProps {
    navigation: NavigationProp<any, any>
}

export const Gallery: React.FC<GalleryProps> = ({ navigation }) => {
    const maxHeight = Dimensions.get("window").height
    const imageData: number[] = Object.values(images.gallery)

    return (
        <View style={{ height: maxHeight, padding: 20, alignItems: "center", justifyContent: "space-between", backgroundColor: colors.background.blue }}>
            <ImageBackground source={images.background.planes} style={{ flex: 1 }}>
                <Text variant="displayLarge" style={{ textAlign: "center", color: "white" }}>
                    Escolha um desenho
                </Text>
                <FlatList
                    data={imageData}
                    horizontal
                    // columnWrapperStyle={{ gap: 20 }}
                    contentContainerStyle={{ gap: 20 }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }: ImageItem) => <ImageContainer navigation={navigation} image={item} />}
                // numColumns={2}
                />
                <Button textVariant="displayMedium" mode="contained" onPress={() => navigation.navigate(routes.home.name)}>
                    Voltar
                </Button>
            </ImageBackground>
        </View>
    )
}
