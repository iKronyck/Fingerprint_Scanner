/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import {Root} from 'native-base';
import {Provider} from 'react-redux';

import {store, persistor} from './store';
import RootApp from './src/screens/Root';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root>
          <RootApp />
        </Root>
      </PersistGate>
    </Provider>
  );
};

export default App;
