import * as yup from 'yup';

export const countrySchema = yup.object().shape({
  name: yup.string().required('Country is required'),
  iso: yup.string().required('Country code is required'),
});

export const addressSchema = yup.object().shape({
  formattedAddress: yup.string().required('Address is required'),
  postCode: yup.string().required('Postal code is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  detailedAddresses: yup.array().of(yup.string()).notRequired(),
});

export const locationSchema = yup.object().shape({
  country: countrySchema,
  address: addressSchema,
});

export type LocationSchemaType = yup.InferType<typeof locationSchema>;
export type AddressSchemaType = yup.InferType<typeof addressSchema>;
export type CountrySchemaType = yup.InferType<typeof countrySchema>;
