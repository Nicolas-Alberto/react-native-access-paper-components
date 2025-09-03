import React, { useState } from "react";
import { Dimensions, ScrollView, View } from "react-native"
import { ActivityIndicator, Button, Card, Modal, Portal, Snackbar, Text, useTheme } from "react-native-paper";

type PaginaPropsType = React.PropsWithChildren<{}>

import { createContext } from 'react';

type ButaoType = {
  nome: string;
  funcao: Function;
}

export type SnackbarAvisoType = {
  exibir: boolean;
  mensagem: string;
}

export type ModalType = {
  exibir: boolean;
  mensagem: string;
  titulo: string;
  botaoConfirmar: ButaoType | undefined;
  botaoCancelar?: ButaoType | undefined;
}

export type ModalComponenteType = {
  exibir: boolean;
  componente: React.JSX.Element
  titulo: string;
  botaoConfirmar: ButaoType | undefined;
  botaoCancelar?: ButaoType | undefined;
}

export type PaginaContextType = {
  setModal: (value: ModalType) => any;
  setModalAviso: (value: ModalComponenteType) => any;
  setModalComponente: (value: ModalComponenteType) => any;
  setLoading: (value: boolean) => any;
  setSnackbarAviso: (value: SnackbarAvisoType) => any;
}

export const PaginaContext = createContext<PaginaContextType>({
  setModal: () => { },
  setModalAviso: () => { },
  setModalComponente: () => { },
  setLoading: () => { },
  setSnackbarAviso: () => { },
});

export const Pagina: React.FC<PaginaPropsType> = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ exibir: false, botaoCancelar: undefined } as ModalType);
  const [modalAviso, setModalAviso] = useState({ exibir: false, botaoCancelar: undefined } as ModalComponenteType);
  const [modalComponente, setModalComponente] = useState({ exibir: false, botaoCancelar: undefined } as ModalComponenteType);
  const [modalInfinita, setModalInfinita] = useState({ exibir: false, botaoCancelar: undefined } as ModalType);
  const [snackbarAviso, setSnackbarAviso] = useState({ exibir: false, mensagem: "Ocorreu um erro! Tente novamente mais tarde." });
  const tema = useTheme();

  return (
    <PaginaContext.Provider value={{ setModal, setModalAviso, setModalComponente, setLoading, setSnackbarAviso }}>
      <View style={{ flex: 1 }}>
        <Snackbar
          style={{ zIndex: 100 }}
          visible={snackbarAviso.exibir}
          onDismiss={() => setSnackbarAviso({ exibir: false, mensagem: "" })}
          action={{ label: 'Fechar' }}
        >
          {snackbarAviso.mensagem}
        </Snackbar>
        {
          loading &&
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
              <View style={{ borderRadius: 10, backgroundColor: tema.colors.background, padding: 8, shadowColor: 'black' }}>
                <ActivityIndicator animating={true} style={{ opacity: 1 }} size={'large'}></ActivityIndicator>
                <Text style={{ marginTop: 10 }}>Carregando...</Text>
              </View>
            </View>
          </Portal>
        }
        {
          modal.exibir &&
          <Portal>
            <Modal visible={true} contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}>
              <Card>
                <Card.Title title={modal.titulo} titleStyle={{ fontWeight: 'bold' }}></Card.Title>
                <Card.Content>
                  <View>
                    <Text variant="bodyLarge">{modal.mensagem}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', paddingTop: 16 }}>
                    <View style={{ flex: 3, paddingRight: 8 }}>
                      <Button style={{ alignContent: 'center' }} buttonColor={tema.colors.secondary} textColor={tema.colors.onSecondary}
                        onPress={() => { modal.botaoCancelar ? (modal.botaoCancelar.funcao(), setModal({ exibir: false } as ModalType)) : setModal({ exibir: false } as ModalType) }}>
                        {modal.botaoCancelar ? modal.botaoCancelar.nome : 'Fechar'}</Button>
                    </View>
                    <View style={{ flex: 3, paddingLeft: 8 }}>
                      {modal.botaoConfirmar &&
                        <Button style={{ alignContent: 'center' }} buttonColor={tema.colors.primary} textColor={tema.colors.onPrimary}
                          onPress={() => { modal.botaoConfirmar!.funcao(), setModal({ exibir: false } as ModalType) }}>{modal.botaoConfirmar.nome}</Button>
                      }
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </Modal>
          </Portal>
        }
        {
          modalComponente.exibir &&
          <Portal>
            <Modal visible={modalComponente.exibir} onDismiss={() => setModalComponente({ exibir: false } as ModalComponenteType)}
              contentContainerStyle={{ paddingLeft: 16, paddingRight: 16, justifyContent: 'center' }}
            >
              <Card>
                <Card.Title title={modalComponente.titulo} titleStyle={{ fontWeight: 'bold' }}></Card.Title>
                <Card.Content>
                  <View style={{ maxHeight: Dimensions.get('window').height * 0.8 }}>
                    <ScrollView>{modalComponente.componente}</ScrollView>
                    <View style={{ flexDirection: 'row', paddingTop: 8 }}>
                      <View style={{ flex: 3 }}>
                        <Button style={{ alignSelf: "flex-start" }} textColor={tema.colors.secondary} mode='text'
                          onPress={() => { modalComponente.botaoCancelar! === undefined ? '' : modalComponente.botaoCancelar!.funcao(), setModalComponente({ exibir: false } as ModalComponenteType) }}>
                          {modalComponente.botaoCancelar! === undefined ? 'Cancelar' : modalComponente.botaoCancelar!.nome}</Button>
                      </View>
                      <View style={{ flex: 3 }}>
                        {modalComponente.botaoConfirmar &&
                          <Button style={{ alignSelf: "flex-end" }} textColor={tema.colors.primary} mode='text'
                            onPress={() => { modalComponente.botaoConfirmar!.funcao(), setModalComponente({ exibir: false } as ModalComponenteType) }}>{modalComponente.botaoConfirmar.nome}</Button>
                        }
                      </View>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </Modal>
          </Portal>
        }
        {
          modalAviso.exibir &&
          <Portal>
            <Modal visible={modalAviso.exibir} onDismiss={() => setModalAviso({ exibir: false } as ModalComponenteType)}
              contentContainerStyle={{ paddingLeft: 16, paddingRight: 16, justifyContent: 'center' }}
            >
              <Card>
                <Card.Title title={modalAviso.titulo} titleStyle={{ fontWeight: 'bold' }}></Card.Title>
                <Card.Content>
                  <View style={{ maxHeight: Dimensions.get('window').height * 0.8 }}>
                    <ScrollView>{modalAviso.componente}</ScrollView>
                    <View style={{ flexDirection: 'row', paddingTop: 8 }}>
                      <View style={{ flex: 3 }}>
                        <Button style={{ alignSelf: "flex-start" }} textColor={tema.colors.primary} mode='text'
                          onPress={() => { modalAviso.botaoCancelar! === undefined ? '' : modalAviso.botaoCancelar!.funcao(), setModalAviso({ exibir: false } as ModalComponenteType) }}>
                          {modalAviso.botaoCancelar! === undefined ? 'Cancelar' : modalAviso.botaoCancelar!.nome}</Button>
                      </View>
                      <View style={{ flex: 3 }}>
                        {modalAviso.botaoConfirmar &&
                          <Button style={{ alignSelf: "flex-end" }} textColor={tema.colors.primary} mode='text'
                            onPress={() => { modalAviso.botaoConfirmar!.funcao(), setModalAviso({ exibir: false } as ModalComponenteType) }}>{modalAviso.botaoConfirmar.nome}</Button>
                        }
                      </View>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </Modal>
          </Portal>
        }
        {
          modalInfinita.exibir &&
          <Portal>
            <Modal visible={true} contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}>
              <Card>
                <Card.Title title={modalInfinita.titulo} titleStyle={{ fontWeight: 'bold' }}></Card.Title>
                <Card.Content>
                  <Text variant="bodyLarge">{modalInfinita.mensagem}</Text>
                  <View style={{ alignContent: 'center' }}>
                    {modalInfinita.botaoConfirmar &&
                      <Button style={{ alignContent: 'center' }} buttonColor={tema.colors.primary} textColor={tema.colors.onPrimary}
                        onPress={() => { modalInfinita.botaoConfirmar!.funcao(), setModalInfinita({ exibir: false } as ModalType) }}>{modalInfinita.botaoConfirmar.nome}</Button>
                    }
                  </View>
                </Card.Content>
              </Card>
            </Modal>
          </Portal>
        }
        {children}
      </View>
    </PaginaContext.Provider>
  );
}

export default Pagina;