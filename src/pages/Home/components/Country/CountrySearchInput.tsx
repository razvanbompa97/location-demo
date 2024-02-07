import { FC, SyntheticEvent } from 'react'; // useState is removed and useEffect is added
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

import {
  CountrySchemaType,
  LocationSchemaType,
} from '../../schemas/addressSchema';
import { defaultAddresState } from '../../hooks/useAddressForm';
import { countries } from './countries';

type CountrySearchInputProps = {
  control: Control<LocationSchemaType>;
  label: string;
  setValue: UseFormSetValue<LocationSchemaType>;
  isError?: boolean;
  helperText?: string;
};

const CountrySearchInput: FC<CountrySearchInputProps> = ({
  control,
  label,
  setValue,
  isError = false,
  helperText = '',
}) => {
  return (
    <Controller
      name="country"
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Autocomplete
          options={countries}
          getOptionLabel={(option) => option.name}
          onChange={(
            _event: SyntheticEvent,
            newValue: CountrySchemaType | null
          ) => {
            onChange(newValue ? newValue : null);
            setValue('address', defaultAddresState);
            setValue('address.city', '');
            setValue('address.postCode', '');
            setValue('address.state', '');
          }}
          onBlur={onBlur}
          value={value}
          isOptionEqualToValue={(option, value) =>
            JSON.stringify(option) === JSON.stringify(value)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={isError}
              helperText={helperText}
              fullWidth
              inputRef={ref}
            />
          )}
        />
      )}
    />
  );
};

export default CountrySearchInput;
