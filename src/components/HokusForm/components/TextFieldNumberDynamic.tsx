import React from "react";
import FormItemWrapper from "./shared/FormItemWrapper";
import TextField from "material-ui/TextField";
import Tip from "../../Tip";
import { BaseDynamic, NormalizeStateContext } from "../../HoForm";

type TextFieldNumberDynamicField = {
  key: string;
  type: string;
  tip: string;
  title: string;
  default: number;
};

type TextFieldNumberDynamicState = {};

class TextFieldNumberDynamic extends BaseDynamic<TextFieldNumberDynamicField, TextFieldNumberDynamicState> {
  normalizeState({ state, field }: NormalizeStateContext<TextFieldNumberDynamicField>) {
    let key = field.key;
    if (state[key] === undefined) {
      state[key] = field.default || 0;
    }
  }

  getType() {
    return "number";
  }

  renderComponent() {
    let { context } = this.props;
    let { node, currentPath } = context;
    let { field } = node;

    if (currentPath !== context.parentPath) {
      return null;
    }

    let setNumberValue = (e: any, value: string) => {
      if (value === undefined || value.length === 0) {
        context.setValue(0);
        return;
      }
      this.forceUpdate();
      context.setValue(parseFloat(value), 250);
    };

    let getNumberValue = function() {
      return (context.value || "").toString();
    };

    let iconButtons = [];
    if (field.tip) iconButtons.push(<Tip markdown={field.tip} />);

    return (
      <FormItemWrapper
        control={
          <TextField
            id={`text-field-${field.key}`}
            onChange={setNumberValue}
            value={getNumberValue()}
            type={"number"}
            floatingLabelFixed={true}
            underlineShow={true}
            fullWidth={true}
            floatingLabelText={field.title}
          />
        }
        iconButtons={iconButtons}
      />
    );
  }
}

export default TextFieldNumberDynamic;
