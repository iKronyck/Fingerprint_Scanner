/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Keychain from 'react-native-keychain';
import StackAuth from './src/routes/auth';
import StackHome from './src/routes/home';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, connect} from 'react-redux';
import {store, persistor} from './store';
import Root from './src/screens/Root';

const App: () => React$Node = ({authorize}) => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
};

export default App;
