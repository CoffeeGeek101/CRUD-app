import './App.css'
import { CreateTask } from './component/CreateTask'
import { TaskList } from './component/TaskList'

function App() {
  return (
    <div className="App">
      <TaskList/>
      <CreateTask/>
    </div>
  )
}

export default App
