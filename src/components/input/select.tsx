import { ErrorMessage, useField } from "formik";
import React from "react";
import Select from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import CreateableSelect from "react-select/creatable";

interface IProps extends StateManagerProps {
  label?: string;
  name: string;
  isMulti?: boolean;
  isCreatable?: boolean;
  props?: {
    [x: string]: StateManagerProps;
  };
}

export const SelectInput: React.FC<IProps> = (props) => {
  const { label, options, isMulti, name, isCreatable } = props;
  const [field, meta, { setValue }] = useField(name);

  return (
    <div className="">
        {
            label && <label className="text-colors-cadet font-semibold mb-3">{label}
            <ErrorMessage
                className="text-red-500 text-cusf3"
                name={name}
                component="p"
            /></label>
        }
      {isCreatable ? (
        <CreateableSelect  {...props} name={name} onChange={(newVal) => setValue(newVal)} />
      ) : (
        <Select
          classNames={{control: (state) => 
          'py-1 rounded-md border border-skin-border'
          }}
          {...field}
          {...props}
          isMulti={isMulti}
          options={options}
          name={name}
          onChange={(val: any) => setValue(val)}
        />
      )}

        {
            !label &&
            <ErrorMessage
            className="text-red-500 text-cusf3 text-left mt-3"
            name={name}
            component="div"
            />
        }
    </div>
  );
};
