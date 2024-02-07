import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LocationSchemaType, locationSchema } from '../schemas/addressSchema';
import { useEffect } from 'react';
import { countries } from '../components/Country/countries';

export const defaultAddresState = {
  formattedAddress: '',
  postCode: '',
  state: '',
  city: '',
  country: '',
  detailedAddresses: [],
};

export const defaultCountryState = countries[0];

export const useAddressForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useForm<LocationSchemaType>({
    defaultValues: {
      country: defaultCountryState,
      address: defaultAddresState,
    },
    resolver: yupResolver(locationSchema),
  });

  useEffect(() => {
    console.log(watch());
  });

  const onSignUpSubmit: SubmitHandler<LocationSchemaType> = async (data) => {
    console.log(data);
  };

  return {
    control,
    errors,
    onSignUpSubmit: handleSubmit(onSignUpSubmit),
    setValue,
    getValues,
  };
};
