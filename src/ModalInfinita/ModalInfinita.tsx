import React from "react";
import {  View } from "react-native";
import {  Button, Card, Modal, Portal, Text, useTheme } from "react-native-paper";
import { ModalType } from "src/Pagina/Pagina";

export type LoadingType = {
    modalInfinita: ModalType,
}
export function ModalInfinita({ modalInfinita }: LoadingType) {

    const tema = useTheme();

    return (
        <>
            {
                modalInfinita.exibir &&
                <Portal>
                    <Modal visible={modalInfinita.exibir} contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}>
                        <Card>
                            <Card.Title title={modalInfinita.titulo} titleStyle={{ fontWeight: 'bold' }}></Card.Title>
                            <Card.Content>
                                <Text variant="bodyLarge">{modalInfinita.mensagem}</Text>
                                <View style={{ alignContent: 'center' }}>
                                    {modalInfinita.botaoConfirmar &&
                                        <Button style={{ alignContent: 'center' }} buttonColor={tema.colors.primary} textColor={tema.colors.onPrimary}
                                            onPress={() =>  modalInfinita.botaoConfirmar!.funcao() }>{modalInfinita.botaoConfirmar.nome}</Button>
                                    }
                                </View>
                            </Card.Content>
                        </Card>
                    </Modal>
                </Portal>
            }
        </>
    );
}