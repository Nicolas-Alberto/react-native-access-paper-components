import { TextInput } from "react-native-paper";
import { type Mask as MaskType } from "react-native-mask-input/src/formatWithMask.types";
import { useState } from 'react';
import MaskInput from "react-native-mask-input";
import React from "react";

export type TextInputRefType = React.ComponentProps<typeof TextInput> & {
    // Mascara opcional que será utilizada no Input.
    mask?: MaskType;
}

export function TextInputRef(props: TextInputRefType) {
    const [value, setState] = useState(props.value);
  
    function handleChange(e: string) {
      setState(e);
      if(props.onChangeText)
        props.onChangeText(e);
    }
  
    return(
      <TextInput
        {...props}
        render={props =>
          <MaskInput
            {...props}
            maskAutoComplete={true}
            onChangeText={(masked, _unmasked) => {
              handleChange(masked);
            }}
          />}
        value={value}
      ></TextInput>
    );
  }