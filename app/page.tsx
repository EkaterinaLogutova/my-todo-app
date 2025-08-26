import TodoList from './components/TodoList';

export interface Todo {
  id: number | string;
  title: string;
  completed: boolean;
}

async function getTodos(): Promise<Todo[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5', { cache: 'no-store' });
  return res.json();
}

export default async function Page() {
  const todos = await getTodos();

  return (
    <main>
      <h1 className="todo-title">Список дел</h1>
      <TodoList initialTodos={todos} />
    </main>
  );
}
