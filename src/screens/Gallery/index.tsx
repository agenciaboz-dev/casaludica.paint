import React from "react"
import { Dimensions, FlatList, Image, View } from "react-native"
import { Avatar, Text } from "react-native-paper"
import images from "./images"
import { Button } from "../../components/Button"
import { NavigationProp } from "@react-navigation/native"
import { routes } from "../../routes"

interface GalleryProps {
    navigation: NavigationProp<any, any>
}

export const Gallery: React.FC<GalleryProps> = ({ navigation }) => {
    const maxHeight = Dimensions.get("window").height
    const imageData: number[] = Object.values(images)

    return (
        <View style={{ height: maxHeight, padding: 20, alignItems: "center", justifyContent: "space-between" }}>
            <Text variant="displayLarge" style={{ textAlign: "center" }}>
                Escolha um desenho
            </Text>
            <FlatList
                data={imageData}
                horizontal
                // columnWrapperStyle={{ gap: 20 }}
                contentContainerStyle={{ gap: 20 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }: ImageItem) => (
                    <View style={{}}>
                        <Image source={item} style={{ width: 300, height: 500, resizeMode: "cover" }} />
                    </View>
                )}
                // numColumns={2}
            />
            <Button textVariant="displayMedium" onPress={() => navigation.navigate(routes.home.name)}>
                Voltar
            </Button>
        </View>
    )
}
