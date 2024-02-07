import { useQuery } from '@tanstack/react-query';

import { getAddressesRequest } from '../../../services/precisely/preciselyApi';
import { usePrecisely } from '../../../context/PreciselyContext/PreciselyContext';

export const useGetAddresses = (searchableText: string, country?: string) => {
  const { preciselyApiToken } = usePrecisely();

  const { data, isLoading, error } = useQuery({
    queryKey: ['addresses', searchableText, country],
    queryFn: ({ signal }) =>
      getAddressesRequest(
        { authToken: preciselyApiToken.token, searchableText, country },
        signal
      ),
    enabled: searchableText.length > 2,
  });

  return {
    addresses: data,
    addressesAreLoading: isLoading,
    addressesError: error,
  };
};
