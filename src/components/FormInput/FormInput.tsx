import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface FormInputProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> extends Omit<
    TextFieldProps,
    'name' | 'label' | 'control' | 'onChange' | 'onBlur'
  > {
  name: TName;
  label: string;
  control: Control<TFieldValues>;
  type?: string;
  error?: boolean;
  helperText?: string;
}

const FormInput = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({
  name,
  label,
  control,
  type = 'text',
  error,
  helperText,
  ...rest
}: FormInputProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...rest}
          {...field}
          label={label}
          variant="outlined"
          fullWidth
          type={type}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};

export default FormInput;
