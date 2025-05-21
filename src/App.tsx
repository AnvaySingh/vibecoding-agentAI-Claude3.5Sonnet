import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { Dashboard } from './components/Dashboard';
import { sampleData } from './sampleData';

function App() {
  return (
    <ChakraProvider>
      <Dashboard data={sampleData} />
    </ChakraProvider>
  );
}

export default App;
