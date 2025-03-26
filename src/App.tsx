import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <TodoList />
    </ChakraProvider>
  );
}

export default App;
