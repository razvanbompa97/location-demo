import { FC } from 'react';
import { Grid } from '@mui/material';

import FormInput from '../../components/FormInput/FormInput';
import FormButton from '../../components/FormButton/FormButton';
import { useAddressForm } from './hooks/useAddressForm';
import AddressesSearchInput from './components/Address/AddressSearchInput';
import CountrySearchInput from './components/Country/CountrySearchInput';

const Home: FC = () => {
  const { onSignUpSubmit, control, errors, setValue, getValues } =
    useAddressForm();

  return (
    <form onSubmit={onSignUpSubmit}>
      <Grid container direction="column" spacing={2} minWidth={600}>
        <Grid item>
          <h1>Address Demo</h1>
        </Grid>
        <Grid item>
          <CountrySearchInput
            control={control}
            label="Country"
            isError={!!errors.country}
            helperText={errors.country?.message}
            setValue={setValue}
          />
        </Grid>
        <Grid item>
          <AddressesSearchInput
            control={control}
            label="Address"
            isError={!!errors.address}
            helperText={errors.address?.message}
            setValue={setValue}
            country={getValues('country').iso}
          />
        </Grid>
        <Grid
          item
          sx={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 2 }}
        >
          <Grid item flex={1}>
            <FormInput
              name="address.city"
              label="City"
              control={control}
              error={!!errors.address?.city}
              helperText={errors.address?.city?.message}
            />
          </Grid>
          <Grid item flex={1}>
            <FormInput
              name="address.state"
              label="State"
              control={control}
              error={!!errors.address?.state}
              helperText={errors.address?.state?.message}
            />
          </Grid>
          <Grid item flex={1}>
            <FormInput
              name="address.postCode"
              label="Post Code"
              control={control}
              error={!!errors.address?.postCode}
              helperText={errors.address?.postCode?.message}
            />
          </Grid>
        </Grid>
        <Grid item>
          <FormButton>VALIDATE</FormButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default Home;
