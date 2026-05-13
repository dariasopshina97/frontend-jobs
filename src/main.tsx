import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import { StrictMode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import { store } from './app/store';
import { theme } from './theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </Provider>
  </StrictMode>,
);
