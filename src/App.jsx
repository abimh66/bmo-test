/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function getTodos() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await res.json();

        setTodos(data.slice(0, 40));
      } catch (e) {
        console.log(e);
      }
    }

    getTodos();
  }, []);

  function deleteHandler(id) {
    setTodos((todoss) => todoss.filter((todo) => todo.id !== id));
  }

  return (
    <div className="flex justify-center  flex-col text-center">
      <div className="p-5 text-xl bg-[#0ab5ab] ">
        <h1 className=" font-bold text-white">Todo App</h1>
        <input
          className="text-[#151515] py-1 px-3"
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          // onChange={(e) =>
          //   setTodos((todoss) => {
          //     console.log(e.target.value);
          //     return todoss.filter((todo) =>
          //       todo.title.includes(e.target.value)
          //     );
          //   })
          // }
        />
      </div>
      <ul className="mx-auto flex flex-col gap-2 py-5 bg-[#151515] text-white">
        {todos.length !== 0 &&
          todos
            .filter((todo) => todo.title.includes(search))
            .map((todo) => (
              <Todo
                key={todo.id}
                completed={todo.completed}
                title={todo.title}
                userId={todo.userId}
                id={todo.id}
                onDelete={deleteHandler}
              />
            ))}
      </ul>
    </div>
  );
}

function Todo({ title, completed, userId, onDelete, id }) {
  const [isComplete, setIsComplete] = useState(completed);

  return (
    <li className="flex items-center gap-2 py-2 px-4 bg-[#1f1f1f]">
      <input
        type="checkbox"
        checked={isComplete}
        onChange={() => setIsComplete((c) => !c)}
      />
      <span className=" px-2 rounded-full border border-gray-300">
        {userId}
      </span>
      <p className={`${isComplete ? 'line-through text-gray-400' : ''}`}>
        {title}
      </p>
      <button
        className="self-end border border-gray-400 rounded-md py-1 px-3"
        onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
}

export default App;
