import { SnackbarProvider } from 'notistack';
import Plans from './Plans';

function PlansWrapper() {
  return (
    <SnackbarProvider 
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Plans />
    </SnackbarProvider>
  );
}

export default PlansWrapper;