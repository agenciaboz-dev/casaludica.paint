import React from "react"
import { Button as PaperButton, ButtonProps, Text } from "react-native-paper"
import { colors } from "../style/colors"
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types"
import { StyleProp, StyleSheet, TextStyle } from "react-native"

interface CustomButtomProps extends ButtonProps {
    textVariant?: VariantProp<Text>
    textStyle?: StyleProp<TextStyle>
}

export const Button: React.FC<CustomButtomProps> = (props) => {
    return (
        <PaperButton {...props} style={[{ borderRadius: 50 }, props.style]}>
            <Text style={[{ color: "white", fontWeight: "800" }, props.textStyle]} variant={props.textVariant}>
                {props.children}
            </Text>
        </PaperButton>
    )
}
