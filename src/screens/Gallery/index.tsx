import React, { useEffect, useRef, useState } from "react"
import { Dimensions, FlatList, Image, ImageBackground, TouchableOpacity, View } from "react-native"
import { Avatar, Button, IconButton, Text } from "react-native-paper"
import images from "./images"
import { NavigationProp } from "@react-navigation/native"
import { ImageContainer } from "./ImageContainer"
import { colors } from "../../style/colors"

interface GalleryProps {
    navigation: NavigationProp<any, any>
}

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export const Gallery: React.FC<GalleryProps> = ({ navigation }) => {
    const maxHeight = Dimensions.get("window").height
    const imageData: number[] = Object.values(images.gallery)
    const galleryRef = useRef<FlatList<number>>(null)

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleChangePage = (operator: number) => {
        setCurrentIndex((index) => {
            const result = index + operator
            if (result < 0 || result > imageData.length - 1) return index

            galleryRef.current?.scrollToIndex({ index: result, animated: true, viewOffset: width * 0.2 })
            return result
        })
    }

    useEffect(() => {
        console.log({ currentIndex })
    }, [currentIndex])

    return (
        <View
            style={{
                backgroundColor: colors.background.blue,
                height: maxHeight,
                gap: 0,
                alignItems: "center",
            }}
        >
            <ImageBackground source={images.background.planes} resizeMode="repeat" style={{
                flex: 1,
                paddingVertical: 40,
                justifyContent: "space-between",
            }}>
                <View style={{
                    gap: 20,
                    position: "relative"
                }}>
                    <Text
                        variant="displayMedium"
                        style={{
                            textAlign: "center",
                            color: "white",
                            textShadowColor: "black",
                            textShadowOffset: { width: 1, height: 1 }, // Deslocamento horizontal e vertical
                            textShadowRadius: 10,
                        }}
                    >
                        Escolha um desenho
                    </Text>
                    <FlatList
                        ref={galleryRef}
                        data={imageData}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        // columnWrapperStyle={{ gap: 20 }}
                        // numColumns={2}
                        contentContainerStyle={{
                            gap: width * 0.4,
                            alignItems: "center",
                            paddingHorizontal: width * 0.2,
                            width: width * imageData.length
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        initialScrollIndex={currentIndex}
                        renderItem={({ item }: ImageItem) => <ImageContainer navigation={navigation} image={item} />}
                        onMomentumScrollEnd={(event) => {
                            const newIndex = Math.round(
                                event.nativeEvent.contentOffset.x / width
                            );
                            setCurrentIndex(newIndex);
                        }}
                    />
                    <View style={{
                        position: "absolute",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: width,
                        top: 350,
                    }}>
                        <IconButton
                            iconColor={colors.secondary}
                            size={72}
                            onPress={() => handleChangePage(-1)}
                            disabled={currentIndex == 0}
                            icon={'arrow-left-thick'}
                            />
                        <IconButton
                            iconColor={colors.secondary}
                            size={72}
                            onPress={() => handleChangePage(1)}
                            disabled={currentIndex == imageData.length - 1}
                            icon={'arrow-right-thick'}
                        />
                    </View>
                    <Button
                        buttonColor={colors.primary}
                        textColor="white"
                        style={{ width: width * 0.6, alignSelf: "center" }}
                        onPress={() => navigation.navigate('home')}
                    >
                        Voltar
                    </Button>
                </View>
            </ImageBackground>
        </View>
    )
}
