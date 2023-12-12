

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}


export {
  DropDonwList
} from "./DropDownList/DropDownList";
export type { 
  DropDownListPropsType 
} from "./DropDownList/DropDownList";

export {
  TextInputRef
} from "./TextInputRef/TextInputRef";

export type { 
  TextInputRefType
} from "./TextInputRef/TextInputRef";
