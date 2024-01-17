import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MyTabs from './src/components/MyTabs/index';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

export default App;
