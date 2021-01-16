import ToDo from './ToDo';

export default function ToDoList({ todos }) {
  return (
    <div
      style={{
        padding: 10,
      }}
    >
      {todos && todos.map((todo) => <ToDo key={todo.id} {...todo} />)}
    </div>
  );
}
