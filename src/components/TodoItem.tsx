import { memo } from 'react';
import { CheckboxCard, HStack, Text } from '@chakra-ui/react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
}

export const memoizedToDoItem = memo(function TodoItem({ todo, onToggle }: TodoItemProps) {
  console.log('item')
  return (
    <HStack w="100%">
      <CheckboxCard.Root
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        colorPalette="green"
      >
        <CheckboxCard.HiddenInput/>
        <CheckboxCard.Control>
          <CheckboxCard.Indicator />
          <CheckboxCard.Label>
            <Text textDecoration={todo.completed ? 'line-through' : 'none'}>
              {todo.text}
            </Text>
          </CheckboxCard.Label>
        </CheckboxCard.Control>
      </CheckboxCard.Root>
    </HStack>
  );
})
