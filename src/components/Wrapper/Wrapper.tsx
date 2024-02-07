import { FC, PropsWithChildren } from 'react';
import { Box, CssBaseline, Grid } from '@mui/material';

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box height="100vh" width="100%" bgcolor="#12263A" display="flex">
      <CssBaseline />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        minHeight={'100%'}
      >
        <Grid height="auto" width="auto">
          <Box
            p={8}
            border="solid"
            borderRadius={10}
            borderColor="white"
            bgcolor="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="auto"
            width="auto"
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Wrapper;
