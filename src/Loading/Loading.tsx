import React from "react";
import { Dimensions, View } from "react-native";
import { ActivityIndicator, Portal, Text } from "react-native-paper";

export type LoadingType = {
    mostra: boolean,
}

export function Loading({ mostra }: LoadingType) {

    return (
        <View>
            {
                mostra &&
                <Portal>
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                        backgroundColor: 'rgba(0,0,0,0.5)', // transparente
                        zIndex: 9999, // alto para ficar no topo
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{ borderRadius: 10, padding: 8, shadowColor: 'black' }}>
                            <ActivityIndicator animating={true} style={{ opacity: 1 }} size={'large'}></ActivityIndicator>
                            <Text style={{ marginTop: 10 }}>Carregando...</Text>
                        </View>
                    </View>
                </Portal>
            }
        </View>
    );
}