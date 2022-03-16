import React, { useEffect, useRef, useState } from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
import Loader from './Loader'
import SearchBar from './Search/SearchBar'

const AddTodo = React.lazy(
  () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./Todo/AddTodo'))
    }, 3000)
  }) 
  )

function App() {
  const [todos, setTodos] = React.useState([])
    // { id: 1, completed: false, title: 'Learn HTML, CSS'},
    // { id: 2, completed: true, title: 'Learn Js'},
    // { id: 3, completed: false, title: 'Learn React'},
    // { id: 4, completed: false, title: 'Learn Java'}
  const [loading, setLoading] = React.useState(true)
  const renderCount = useRef(0)
  const[data,setData] = useState([])

  useEffect(() => {
    renderCount.current = renderCount.current + 1
  })
  
  
useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(response => response.json())
    .then(todos => {
      setTimeout(() => {
        setTodos(todos)
        setLoading(false)
      }, 2000)     
    })
}, [])

  function toggleTodo(id){
    setTodos(
    todos.map(todo => {
    if (todo.id === id) {
      todo.completed = !todo.completed
    }
    return todo
    })
    )
  }

  function removeTodo(id){
   setTodos(todos.filter(todo => todo.id !== id))
  }
  
  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }
  function searchResult(data){
    console.log("data=", data)
    setData(data)
  }
  return (
    <Context.Provider value={{ removeTodo }}>
    <div className='wrapper'>
      <h1>My own Learning To Do List</h1>
      <React.Suspense fallback={<p>Loading...</p>}>
      
      <AddTodo onCreate={addTodo} /> 
      <SearchBar placeholder="Search todo ..." data={todos} filterData={searchResult}/>
      </React.Suspense>     
      {loading && <Loader />}
      {todos.length ? (
      <TodoList todos={data.length > 0 ? data : todos} onToggle={toggleTodo} />
      ) : loading ? null : (
        <p>No todos!</p> 
       )}  
       <div> I rendered {renderCount.current} times </div>   
       <div >
      
    </div> 
     
    </div>
    </Context.Provider>
    
  )
}

export default App

// className="App"