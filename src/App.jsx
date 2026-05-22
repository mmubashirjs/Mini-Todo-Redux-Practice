import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, editeTodo, removeTodo } from './redux-config/reducers/todoslice';

const App = () => {

  const todo = useRef();

  const dispatch = useDispatch();
  const selector = useSelector(state => state.todos);

  const addTodoReducer = (e) => {
    e.preventDefault()

    dispatch(addTodo({
      title: todo.current.value
    }))

    todo.current.value = ''
  }

  const deletTodo = (index) => {
    dispatch(removeTodo({
      index: index
    }))
  }

  const editTodo = (oldTitle, id) => {

    const title = prompt("Enter new Title", oldTitle)

    dispatch(editeTodo({
      id,
      title
    }))
  }

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-start p-5'>

  <div className='w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 md:p-10'>

    <h1 className='text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10'>
      Todo App
    </h1>

    <form
      onSubmit={addTodoReducer}
      className='flex flex-wrap gap-4 mb-10'
    >

      <input
        type="text"
        placeholder='Write your todo...'
        ref={todo}
        className='flex-1 min-w-[250px] border-2 border-gray-300 rounded-xl px-5 py-3 text-lg outline-none focus:border-black transition'
      />

      <button
        type='submit'
        className='bg-black text-white px-8 py-3 rounded-xl hover:scale-105 transition'
      >
        Add Todo
      </button>

    </form>

    <ul className='space-y-5'>

      {selector.map((item, index) => {

        return (

          <li
            key={item.id}
            className='bg-gray-50 border border-gray-200 rounded-2xl p-5 flex flex-wrap gap-5 justify-between items-center shadow-sm'
          >

            <h2 className='text-lg md:text-xl font-semibold text-gray-800 break-words flex-1'>
              {item.title}
            </h2>

            <div className='flex flex-wrap gap-3'>

              <button
                onClick={() => editTodo(item.title, item.id)}
                className='bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition'
              >
                Edit
              </button>

              <button
                onClick={() => deletTodo(index)}
                className='bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition'
              >
                Delete
              </button>

            </div>

          </li>

        )
      })}

    </ul>

  </div>

</div>
  )
}

export default App