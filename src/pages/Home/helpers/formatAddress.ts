import { LocationsResponseType } from '../../../services/precisely/types/preciselyApiTypes';
import { AddressSchemaType } from '../schemas/addressSchema';

export const formatAddresses = (
  responseAddress: LocationsResponseType
): AddressSchemaType => {
  return {
    formattedAddress: responseAddress.address.formattedAddress,
    state: responseAddress.address.areaName1,
    city: responseAddress.address.areaName3,
    postCode: responseAddress.address.postCode,
    detailedAddresses: responseAddress.ranges.flatMap((location) =>
      location.units.map((unit) => unit.formattedUnitAddress)
    ),
  };
};

export const formatDetailedAddresses = (
  selectedAddress: AddressSchemaType
): AddressSchemaType[] => {
  return (
    selectedAddress.detailedAddresses?.flatMap((address) => ({
      formattedAddress: address || selectedAddress.formattedAddress,
      city: selectedAddress.city,
      state: selectedAddress.state,
      postCode: selectedAddress.postCode,
    })) || []
  );
};
