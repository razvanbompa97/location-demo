import { FC, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import Wrapper from '../../components/Wrapper/Wrapper';
import { routes } from './routes';
import RedirectRouteWrapper from './RedirectRouteWrapper';

const AppRouter: FC = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              width: '100vh',
              backgroundColor: '#12263A',
              padding: '0',
            }}
          >
            <CircularProgress size={80} style={{ color: 'white' }} />
          </Box>
        }
      >
        <Wrapper>
          <Routes>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <RedirectRouteWrapper
                      authenticatedRoute={route.authenticatedRoute}
                    >
                      <route.component />
                    </RedirectRouteWrapper>
                  }
                />
              );
            })}
          </Routes>
        </Wrapper>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
