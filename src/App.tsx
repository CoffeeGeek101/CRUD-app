import { Provider } from 'react-redux'
import './App.css'
import { CreateTask } from './component/CreateTask'
import { TaskList } from './component/TaskList'
import { store } from './redux/store'

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <TaskList/>
      <CreateTask/>
    </div>
    </Provider>
  )
}

export default App
