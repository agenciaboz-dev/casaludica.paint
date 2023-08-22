import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { Button as PaperButton, ButtonProps, Text } from "react-native-paper"
import { colors } from "../style/colors"

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <LinearGradient
            style={{ borderRadius: 50 }}
            colors={colors.backgroundGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.5, 1]}
        >
            <PaperButton {...props} style={{}} buttonColor="transparent">
                oi
            </PaperButton>
        </LinearGradient>
    )
}
