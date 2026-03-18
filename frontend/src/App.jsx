import { TaskList } from "./components/TaskList";

function App() {
  return (
    <main id="center">
      <header>
        <h1>Task Manager</h1>
        <p>Browse your tasks in a smooth, infinite carousel.</p>
      </header>
      <TaskList />
    </main>
  );
}

export default App;