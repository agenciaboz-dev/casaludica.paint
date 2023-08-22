import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "./screens/Home"
import { colors } from "./style/colors"
import { Gallery } from "./screens/Gallery"

interface RoutesProps {}

export const routes = {
    home: { name: "home", component: Home },
    gallery: { name: "gallery", component: Gallery },
}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const Stack = createNativeStackNavigator()
    const navigator_options: NativeStackNavigationOptions = {
        headerStyle: {
            backgroundColor: colors.secondary,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
            fontWeight: "bold",
        },
        headerTitleAlign: "center",
        animation: "slide_from_right",
        headerShown: false,
    }
    const home_header_options = {
        title: "Casa Lúdica alguma coisa",
        headerShown: false,
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="home" screenOptions={navigator_options}>
                {Object.entries(routes).map(([_, screen]) => (
                    <Stack.Screen key={screen.name} name={screen.name} component={screen.component} />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
