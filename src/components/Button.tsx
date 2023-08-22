import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { Button as PaperButton, ButtonProps, Text } from "react-native-paper"
import { colors } from "../style/colors"
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types"

interface CustomButtomProps extends ButtonProps {
    textVariant?: VariantProp<Text>
}

export const Button: React.FC<CustomButtomProps> = (props) => {
    return (
        <LinearGradient
            style={{ borderRadius: 50, justifyContent: "center", alignItems: "center" }}
            colors={colors.backgroundGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.5, 1]}
        >
            <PaperButton {...props} style={{}} buttonColor="transparent">
                <Text style={{ color: "white" }} variant={props.textVariant}>
                    {props.children}
                </Text>
            </PaperButton>
        </LinearGradient>
    )
}
