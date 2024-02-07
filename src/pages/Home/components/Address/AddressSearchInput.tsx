import {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  UseFormSetValue,
} from 'react-hook-form';
import { useDebounce } from '@react-hook/debounce';
import { LocationOn } from '@mui/icons-material';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { useGetAddresses } from '../../hooks/useGetAddresses';
import {
  formatAddresses,
  formatDetailedAddresses,
} from '../../helpers/formatAddress';
import {
  AddressSchemaType,
  LocationSchemaType,
} from '../../schemas/addressSchema';
import { defaultAddresState } from '../../hooks/useAddressForm';

type AddressesSearchInputProps = {
  control: Control<LocationSchemaType>;
  label: string;
  setValue: UseFormSetValue<LocationSchemaType>;
  country: string;
  isError?: boolean;
  helperText?: string;
};

const AddressesSearchInput: FC<AddressesSearchInputProps> = ({
  control,
  label,
  setValue,
  country,
  isError,
  helperText,
}) => {
  const keepDropdownOpenRef = useRef(false);
  const [addressDebouncedInputValue, setAddressDebouncedInputValue] =
    useDebounce('', 500);
  const { addresses, addressesAreLoading } = useGetAddresses(
    addressDebouncedInputValue,
    country
  );
  const [selectedAddress, setSelectedAddress] =
    useState<AddressSchemaType | null>(null);
  const [options, setOptions] = useState<AddressSchemaType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastSelectedAddress, setLastSelectedAddress] =
    useState<AddressSchemaType | null>(null);

  useEffect(() => {
    if (selectedAddress) {
      const formattedOptions = formatDetailedAddresses(selectedAddress);
      setOptions(formattedOptions);
    } else if (addresses?.location.length) {
      const formattedOptions = addresses.location.map((loc) =>
        formatAddresses(loc)
      );
      setOptions(formattedOptions);
    } else {
      setOptions([]);
    }
  }, [
    addressDebouncedInputValue.length,
    addresses,
    addressesAreLoading,
    lastSelectedAddress,
    selectedAddress,
  ]);

  const clearFields = useCallback(() => {
    setValue('address.formattedAddress', '');
    setValue('address.city', '');
    setValue('address.state', '');
    setValue('address.postCode', '');
  }, [setValue]);

  const handleOnChange = (
    _event: SyntheticEvent,
    option: string | AddressSchemaType | (string | AddressSchemaType)[] | null,
    field: ControllerRenderProps<LocationSchemaType, 'address'>
  ) => {
    if (option === null) {
      return;
    }

    if (typeof option === 'string') {
      setAddressDebouncedInputValue(option);

      clearFields();

      setSelectedAddress(null);

      return;
    }

    if (Array.isArray(option)) {
      return;
    }

    if (option.detailedAddresses && option.detailedAddresses.length > 1) {
      keepDropdownOpenRef.current = true;

      return setSelectedAddress(option);
    }

    if (
      !('detailedAddresses' in option) ||
      (option.detailedAddresses && option.detailedAddresses.length < 2)
    ) {
      field.onChange({
        formattedAddress: option.formattedAddress,
        city: option.formattedAddress,
        state: option.state,
        postCode: option.postCode,
      });

      setValue('address.city', option.city);
      setValue('address.state', option.state);
      setValue('address.postCode', option.postCode);

      setLastSelectedAddress(option);
      setOptions([]);
      setSelectedAddress(null);
      setIsOpen(false);
      setAddressDebouncedInputValue('');
    } else {
      throw new Error('Found an unhandled case');
    }
  };

  const handleInputChange = useCallback(
    (
      _event: SyntheticEvent,
      value: string,
      reason: string,
      field: ControllerRenderProps<LocationSchemaType, 'address'>
    ) => {
      if (reason === 'clear') {
        setAddressDebouncedInputValue('');

        clearFields();

        setSelectedAddress(null);
      }

      if (reason === 'reset') {
        setAddressDebouncedInputValue('');
      }

      if (reason === 'input') {
        setAddressDebouncedInputValue(value);

        clearFields();
      }

      if (
        reason === 'input' &&
        selectedAddress &&
        value !== selectedAddress.formattedAddress
      ) {
        setSelectedAddress(null);

        clearFields();

        field.onChange(defaultAddresState);
      }

      if (
        reason === 'input' &&
        lastSelectedAddress &&
        value !== lastSelectedAddress.formattedAddress
      ) {
        setSelectedAddress(null);

        clearFields();

        field.onChange({ ...defaultAddresState, formattedAddress: value });
      }
    },
    [
      clearFields,
      lastSelectedAddress,
      selectedAddress,
      setAddressDebouncedInputValue,
    ]
  );

  const getOptionLabelHandler = useCallback(
    (option: string | AddressSchemaType) => {
      if (typeof option === 'string') {
        return option;
      }

      return option.formattedAddress;
    },
    []
  );

  const handleOnBlur = useCallback(
    (field: ControllerRenderProps<LocationSchemaType, 'address'>) => {
      if (
        field.value.formattedAddress === lastSelectedAddress?.formattedAddress
      ) {
        return;
      }

      setAddressDebouncedInputValue('');

      setSelectedAddress(null);

      field.onChange(defaultAddresState);
    },
    [lastSelectedAddress?.formattedAddress, setAddressDebouncedInputValue]
  );

  return (
    <Controller
      name="address"
      control={control}
      render={({ field }) => {
        return (
          <Autocomplete
            {...field}
            freeSolo
            loading={addressesAreLoading}
            options={options}
            open={isOpen}
            onClose={(event, reason) => {
              if (reason === 'selectOption' && keepDropdownOpenRef.current) {
                event.preventDefault();
                setIsOpen(true);
              } else {
                setIsOpen(false);
              }
            }}
            onOpen={() => setIsOpen(true)}
            value={field.value}
            getOptionLabel={getOptionLabelHandler}
            onInputChange={(event, value, reason) =>
              handleInputChange(event, value, reason, field)
            }
            onChange={(event, data) => handleOnChange(event, data, field)}
            filterOptions={(options) => options}
            onBlur={() => handleOnBlur(field)}
            renderOption={(props, option) => {
              return (
                <li key={uuidv4()} {...props}>
                  <LocationOn />
                  <Typography variant="body1" noWrap>
                    {option.formattedAddress}
                  </Typography>
                  {option.detailedAddresses &&
                    option.detailedAddresses.length > 1 && (
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textSecondary"
                          sx={{ mx: 1 }}
                        >
                          -
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {option.detailedAddresses?.length.toString()}{' '}
                          addresses
                        </Typography>
                      </>
                    )}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                error={isError}
                helperText={helperText}
                fullWidth
              />
            )}
          />
        );
      }}
    />
  );
};

export default AddressesSearchInput;
