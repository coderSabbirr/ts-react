import { useCallback, useReducer, useRef } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
}
type ActionType =
  | { type: "ADD"; Text: "string" | any }
  | { type: "REMOVE"; id: number };

function App() {
  function reducer(state: Todo[], action: ActionType) {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.Text,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }
  const [todos, dispatch] = useReducer(reducer, []);
  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        Text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "10px" }}>
      <input type="text" ref={newTodoRef} />
      <button onClick={onAddTodo}>Add</button>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            {todo.text}

            <button onClick={() => dispatch({ type: "REMOVE", id: todo.id })}>
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
