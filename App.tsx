import { StatusBar } from "expo-status-bar"
import { StyleSheet, ImageBackground } from "react-native"
import { PaperProvider } from "react-native-paper"
import { Routes } from "./src/Router"
import { theme } from "./src/style/theme"
import { colors } from "./src/style/colors"
import images from "./assets/background/background-planes.png"

export default function App() {
    return (
        <ImageBackground source={images.background.planes} style={{ flex: 1, backgroundColor: colors.bgLightBlue }}>
            <PaperProvider theme={theme}>
                <StatusBar style="auto" />
                <Routes />
            </PaperProvider>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
})
