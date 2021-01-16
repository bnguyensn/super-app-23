import './App.css';
import ToDoList from './components/ToDoList';
import useTodos from './services/useTodos';

function App() {
  const { data: todos, loading: todosLoading, error: todosError } = useTodos();

  return (
    <div className="App">
      <header>
        <h1>React / GraphQL app</h1>
      </header>
      <main>
        {todos && todos.todos ? (
          <ToDoList todos={todos.todos} />
        ) : todosLoading ? (
          <div>Loading todos...</div>
        ) : todosError ? (
          <div>Error: {todosError.message}</div>
        ) : null}
      </main>
    </div>
  );
}

export default App;
