import { SnackbarProvider } from 'notistack';
import Contact from './Contact';

function ContactWrapper() {
  return (
    <SnackbarProvider 
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Contact />
    </SnackbarProvider>
  );
}

export default ContactWrapper;