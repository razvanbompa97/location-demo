import { FC, ReactNode } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';

interface FormButtonProps {
  children: ReactNode;
  isLoading?: boolean;
}

const FormButton: FC<FormButtonProps> = ({ children, isLoading }) => {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      size="large"
      style={{ position: 'relative' }}
    >
      {isLoading && (
        <CircularProgress
          size={24}
          style={{
            color: 'white',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
          }}
        />
      )}
      <Box
        component="span"
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
      >
        {children}
      </Box>
    </Button>
  );
};

export default FormButton;
