import React from "react";
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { TodoList } from './TodoList';

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);
};

describe('TodoList', () => {
  it('should add a new todo', () => {
    renderWithChakra(<TodoList />);
    
    const input = screen.getByPlaceholderText('Добавьте новую задачу');
    const addButton = screen.getByText('Добавить задачу');
    const activeTodos = screen.getByTestId('all');
    
    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.click(addButton);

    expect(activeTodos).toHaveTextContent('New todo');
  });

  it('should toggle todo completion', () => {
    renderWithChakra(<TodoList />);

    const input = screen.getByPlaceholderText('Добавьте новую задачу');
    const addButton = screen.getByText('Добавить задачу');
    
    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(checkbox).toBeChecked();
  });

  it('should switch tab completed', () => {
    renderWithChakra(<TodoList />);

    const input = screen.getByPlaceholderText('Добавьте новую задачу');
    const addButton = screen.getByText('Добавить задачу');
    const completedTodos = screen.getByTestId('completed');
    const completedTab = screen.getByText('Выполненные')

    fireEvent.change(input, { target: { value: 'Completed todo' } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    fireEvent.click(completedTab)

    expect(checkbox).toBeChecked();
    expect(completedTodos).toHaveTextContent('Completed todo');
  });
}); 