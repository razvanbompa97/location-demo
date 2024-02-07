import { useEffect, useState, PropsWithChildren, FC, useCallback } from 'react';

import PreciselyContext, { preciselyDefaultState } from './PreciselyContext';
import { getPreciselyAuthorizationToken } from '../../services/precisely/preciselyApi';

const PreciselyContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [preciselyApiToken, setPreciselyApiToken] = useState(
    preciselyDefaultState
  );

  const fetchAuthToken = useCallback(async () => {
    const { token, expiresIn } = await getPreciselyAuthorizationToken();

    if (token.length && expiresIn.length) {
      const expiresInTimestamp =
        new Date().getTime() + parseInt(expiresIn, 10) * 1000;

      const newState = {
        token,
        expiresIn: expiresInTimestamp,
      };

      setPreciselyApiToken(newState);
      localStorage.setItem('preciselyApi', JSON.stringify(newState));
      setTimeout(fetchAuthToken, parseInt(expiresIn, 10) * 1000);
    }
  }, []);

  useEffect(() => {
    const currentTime = new Date().getTime();

    if (preciselyApiToken.token && preciselyApiToken.expiresIn > currentTime) {
      const refreshTimeout = preciselyApiToken.expiresIn - currentTime;
      const timeoutId = setTimeout(fetchAuthToken, refreshTimeout);
      return () => clearTimeout(timeoutId);
    }

    if (
      !preciselyApiToken.token ||
      preciselyApiToken.expiresIn <= currentTime
    ) {
      fetchAuthToken();
    }
  }, [fetchAuthToken, preciselyApiToken]);

  return (
    <PreciselyContext.Provider
      value={{
        preciselyApiToken,
      }}
    >
      {children}
    </PreciselyContext.Provider>
  );
};

export default PreciselyContextProvider;
