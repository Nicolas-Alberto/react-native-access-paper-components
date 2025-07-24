import React from "react";
import { DimensionValue, View, ViewProps } from "react-native";

export type ColPropsType = ViewProps & {
    sm?: number, md?: number
}
export function Col(props: ColPropsType) {
    const tamanhoUnitario = 100 / 24;
    const md = true;
    const sm = false;

    function retornarTamanhe(): DimensionValue {
        if (md && props.md)
            return `${tamanhoUnitario * props.md}%`;
        else if (sm && props.sm)
            return `${tamanhoUnitario * props.sm}%`;
        else
            return 'auto';
    }

    return (
        <View {...props} style={{ ...props.style as {}, width: retornarTamanhe() }}>
            {props.children}
        </View>
    );
}