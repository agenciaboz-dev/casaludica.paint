import React from "react"
import { Button as PaperButton, ButtonProps } from "react-native-paper"

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <PaperButton {...props} style={{}}>
            oi
        </PaperButton>
    )
}
