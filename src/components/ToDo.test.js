import { render, screen } from '@testing-library/react';
import ToDo from './ToDo';

const testTodo = {
  id: 'some-id',
  createdDate: 0,
  tags: ['hello', 'world'],
  content: 'My content',
  done: false,
  color: null,
};

describe('ToDo', () => {
  it('renders correctly', () => {
    render(<ToDo {...testTodo} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getByRole('list')).toHaveStyle({
      backgroundColor: 'transparent',
    });
    expect(screen.getByText(/content/i)).toBeInTheDocument();
    expect(screen.getByText(/hello, world/im)).toBeInTheDocument();
    expect(screen.getByText(/no/i)).toBeInTheDocument();
    expect(screen.queryByText(/yes/i)).not.toBeInTheDocument();
  });
});
