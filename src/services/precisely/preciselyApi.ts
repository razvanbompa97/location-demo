import axios from 'axios';
import qs from 'qs';

import {
  GetAddressesRequestParamsType,
  GetAddressesResponseType,
  PreciselyAuthorizationTokenResponseType,
} from './types/preciselyApiTypes';

export const getPreciselyAuthorizationToken = async () => {
  const apiKey = import.meta.env.VITE_PRECISELY_API_KEY;
  const secretKey = import.meta.env.VITE_PRECISELY_API_SECRET;

  if (!apiKey || !secretKey) {
    throw new Error('No env variables found for precisely api');
  }

  const combinedKeys = `${apiKey}:${secretKey}`;
  const encodedApiKey = btoa(combinedKeys);

  const body = qs.stringify({
    grant_type: 'client_credentials',
  });

  const response = await axios.post<PreciselyAuthorizationTokenResponseType>(
    'https://api.precisely.com/oauth/token',
    body,
    {
      headers: {
        Authorization: `Basic ${encodedApiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  if (response.data) {
    return {
      token: response.data.access_token,
      expiresIn: response.data.expiresIn,
    };
  }

  return {
    token: '',
    expiresIn: '',
  };
};

export const getAddressesRequest = async (
  { authToken, searchableText, country }: GetAddressesRequestParamsType,
  signal: AbortSignal
) => {
  const response = await axios.get<GetAddressesResponseType>(
    `https://api.precisely.com/typeahead/v1/locations?searchText=${searchableText}&country=${
      country || 'USA'
    }`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      signal,
    }
  );

  return response.data;
};
