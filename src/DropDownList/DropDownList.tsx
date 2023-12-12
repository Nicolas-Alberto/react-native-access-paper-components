import { useState } from "react";
import React from "react";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { Button, Dialog, Portal, TextInput, RadioButton, Divider } from "react-native-paper";

export type DropDownListPropsType = Omit<React.ComponentProps<typeof TextInput>, "value"> & {
  /** Valor atual/selecionado, deve ser passado a propriedade do mesmo tipo informado no optionId.*/
  value: any,
  /** Função que recebera o valor ao selecionar uma opção no Drop, normalmente utilizado setState.*/
  setValue: Function,
  /** Array que será usado para popular as opções do Drop.*/
  options: any[],
  /** Nome da propriedade do item das opções que será usarado como valor.*/
  optionId: string,
  /** Nome da propriedade do item das opções que será exibido.*/
  optionNome: string,
  /** Texto da opção inicial sem valor.*/
  inicialLabel?: string | undefined;
  /** Exibe campo de busca das opções.*/
  select2?: boolean | undefined;
};

export function DropDonwList({ 
    style, label, placeholder, mode, value, setValue, options, optionId, optionNome, inicialLabel, error, select2 
}: DropDownListPropsType) {
    const [visible, setVisible] = useState(false);
    const [textoBusca, setTextoBusca] = useState("");
  
    function buscarOpcao(e: string) {
        setTextoBusca(e)
    }
  
    function marcarOpcao(option: any) {
        setVisible(false);
        setValue(option);
        setTextoBusca("");
    }
  
    function getText() {
        const option = options.find((o: any) => o[optionId] === value)
        if (option !== undefined && option !== null)
            return option[optionNome];
        else
            return inicialLabel
    }
  
    function fecharDropDown() {
        setVisible(false);
        setTextoBusca("");
    }
  
    return (
        <React.Fragment>
  
            <TouchableOpacity onPress={() => setVisible(true)} >
                <TextInput style={style} label={label} placeholder={placeholder} mode={mode ? mode : 'outlined'} value={getText()} editable={false} error={error} right={<TextInput.Icon icon="menu-down" onPress={() => setVisible(true)} />} />
            </TouchableOpacity>
            <Portal>
                <Dialog visible={visible} onDismiss={() => fecharDropDown()}>
                    <GestureHandlerRootView >
                        <ScrollView style={{ paddingVertical: 0 }}>
                            <Dialog.Title>Selecione a opção:</Dialog.Title>
                            <Dialog.Content>
  
                                {
                                    select2 &&
                                    <>
                                        <TextInput label={"Busca"} placeholder="Busca" mode={mode ? mode : 'outlined'} value={textoBusca}
                                            left={<TextInput.Icon icon={"magnify"} />}
                                            onChangeText={(e) => buscarOpcao(e)}
                                        />
                                        <Divider />
                                    </>
                                }
                                <RadioButton.Group onValueChange={value => marcarOpcao(value)} value={value}>
                                    {
                                        inicialLabel !== undefined && textoBusca === "" && (
                                            <RadioButton.Item value={""} label={inicialLabel} />
                                        )
                                    }
                                    {
                                        options.filter(option => option[optionNome].toLowerCase().includes(textoBusca.toLowerCase()) || textoBusca === "").map((option: any, key: any) =>
                                            <RadioButton.Item key={key} value={option[optionId]} label={option[optionNome]} />
                                        )
                                    }
                                </RadioButton.Group>
  
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={() => fecharDropDown()}>Fechar</Button>
                            </Dialog.Actions>
                        </ScrollView>
  
                    </GestureHandlerRootView>
  
                </Dialog>
            </Portal>
        </React.Fragment>
    )
  }