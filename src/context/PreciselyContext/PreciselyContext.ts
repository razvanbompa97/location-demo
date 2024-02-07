import { createContext, useContext } from 'react';

type PreciselyTokenType = {
  token: string;
  expiresIn: number;
};

type PreciselyContextType = {
  preciselyApiToken: PreciselyTokenType;
};

const preciselyApiLocalStorage = localStorage.getItem('preciselyApi');
const preciselyApiJson = preciselyApiLocalStorage
  ? JSON.parse(preciselyApiLocalStorage)
  : {};

export const preciselyDefaultState: PreciselyTokenType = {
  token: preciselyApiJson.token || '',
  expiresIn: preciselyApiJson.expiresIn || 0,
};

const PreciselyContext = createContext<PreciselyContextType>({
  preciselyApiToken: preciselyDefaultState,
});

export default PreciselyContext;

export const usePrecisely = () => {
  return useContext(PreciselyContext);
};
