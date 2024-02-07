export type PreciselyAuthorizationTokenResponseType = {
  access_token: string;
  tokenType: string;
  issuedAt: string;
  expiresIn: string;
  clientID: string;
  org: string;
};

export type GetAddressesRequestParamsType = {
  authToken: string;
  searchableText: string;
  country?: string;
};

export type AddressResponseCustomFieldsType = {
  DISTANCE: string;
  DISTANCE_UNIT: string;
  FEATUREID: string;
  FORMATTED_STRING: string;
  FROM_CUSTOM_DATASET: string;
  MATCHED_FROM_STREETNAME: string;
  PB_KEY: string;
  RECORD_TYPE: string;
};

export type AddressResponseType = {
  addressLastLine: string;
  addressNumber: string;
  areaName1: string;
  areaName2: string;
  areaName3: string;
  areaName4: string;
  country: string;
  customFields: AddressResponseCustomFieldsType;
  formattedAddress: string;
  mainAddressLine: string;
  placeName: string;
  postCode: string;
  postCodeExt: string;
  streetName: string;
  unitType: string;
  unitValue: string;
};

export type GeometryResponseType = {
  type: string;
  coordinates: number[];
};

export type UnitsResponseType = {
  formattedUnitAddress: string;
  unitInfo?: string;
};

export type RangesResponseType = {
  placeName: string;
  units: UnitsResponseType[];
};

export type LocationsResponseType = {
  address: AddressResponseType;
  geometry: GeometryResponseType;
  ranges: RangesResponseType[];
  totalUnitCount: number;
};

export type GetAddressesResponseType = {
  location: LocationsResponseType[];
};
