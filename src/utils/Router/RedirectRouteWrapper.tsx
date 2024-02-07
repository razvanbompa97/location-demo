import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

interface RedirectRouteProps {
  authenticatedRoute?: boolean;
}

const RedirectRouteWrapper: FC<PropsWithChildren<RedirectRouteProps>> = ({
  authenticatedRoute,
  children,
}) => {
  const isLoggedIn = false; // In case of a real app, this would be a boolean value from the state

  if (authenticatedRoute && !isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (!authenticatedRoute && isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default RedirectRouteWrapper;
