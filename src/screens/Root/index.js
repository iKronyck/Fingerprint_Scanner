import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackAuth from '../../routes/auth';
import StackHome from '../../routes/home';
import {connect} from 'react-redux';

const Root = ({authorize}) => {
  return (
    <NavigationContainer>
      {authorize ? <StackHome /> : <StackAuth />}
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  authorize: state.auth.authorize,
});

export default connect(mapStateToProps)(Root);
