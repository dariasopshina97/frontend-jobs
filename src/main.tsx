import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import { StrictMode } from 'react';
import { MantineProvider } from '@mantine/core';

import './index.css';
import App from './App';
import { store } from './app/store';
import { theme } from './theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>,
);
