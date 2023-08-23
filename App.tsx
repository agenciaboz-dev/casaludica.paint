import { StatusBar } from "expo-status-bar"
import { StyleSheet, ImageBackground } from "react-native"
import { PaperProvider } from "react-native-paper"
import { Routes } from "./src/Router"
import { theme } from "./src/style/theme"
import { useFonts } from 'expo-font';

export default function App() {

    let [loaded] = useFonts({
        'KGSecondChancesSolid': require('./assets/fonts/KGSecondChancesSolid.ttf'),
        'KGSecondChancesSketch': require('./assets/fonts/KGSecondChancesSketch.ttf'),
    });

    if (!loaded) {
        return <>

        </>
    }


    return (
        <PaperProvider theme={theme}>
            <StatusBar style="auto" hidden />
            <Routes />
        </PaperProvider>
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
