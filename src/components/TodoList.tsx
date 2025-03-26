import {
  useState,
  SyntheticEvent,
  useMemo,
  useCallback,
  ChangeEvent,
} from 'react';
import {
  VStack,
  Input,
  Button,
  Box,
  Heading,
  Tabs,
  StackSeparator,
  Center,
  Field
} from '@chakra-ui/react';
import { memoizedToDoItem as TodoItem} from './TodoItem';
import { Todo } from '../types/todo';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: self.crypto.randomUUID(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date(),
    };

    setTodos(prevTodos => [...prevTodos, todo]);
    setNewTodo('');
  };

  const addNewTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
  };

  const toggleTodo = useCallback((id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, [todos]);

  const completedTodos = useMemo(() => todos.filter(todo => todo.completed), [todos]);
  const uncompletedTodos = useMemo(() => todos.filter(todo => !todo.completed), [todos]);

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <Center>
        <Heading as="h1" mb={8}>ToDo App</Heading>
      </Center>

      <form onSubmit={addTodo}>
        <VStack>
          <Field.Root>
            <Field.Label>Новая задача</Field.Label>
            <Input
              placeholder="Добавьте новую задачу"
              value={newTodo}
              type="text"
              onChange={addNewTodo}
              colorPalette="green"
              autoComplete="off"
            />
          </Field.Root>
          <Button type="submit" w="100%" colorPalette="green">
            Добавить задачу
          </Button>
        </VStack>
      </form>

      <Tabs.Root defaultValue="all">
        <Tabs.List>
          <Tabs.Trigger value="all">Все</Tabs.Trigger>
          <Tabs.Trigger value="active">Активные</Tabs.Trigger>
          <Tabs.Trigger value="completed">Выполненные</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="all" data-testid="all">
          <VStack separator={<StackSeparator />}>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
              />
            ))}
          </VStack>
        </Tabs.Content>

        <Tabs.Content value="active" data-testid="active">
          <VStack separator={<StackSeparator />}>
            {uncompletedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
              />
            ))}
          </VStack>
        </Tabs.Content>

        <Tabs.Content value="completed" data-testid="completed">
          <VStack separator={<StackSeparator />}>
            {completedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
              />
            ))}
          </VStack>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
