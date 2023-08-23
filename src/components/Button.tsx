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
        <PaperButton {...props} style={{ borderRadius: 50, paddingLeft: 10, paddingRight: 10 }} buttonColor="#FF7C0A">
            <Text style={{ color: "white", fontWeight: "800" }} variant={props.textVariant}>
                {props.children}
            </Text>
        </PaperButton>
    )
}
