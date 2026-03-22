export const initialStore = () => {
  return {
    message: null,
    token: sessionStorage.getItem("token") || null,
    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null },
    ],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo,
        ),
      };

    case "set_token":
      return {
        ...store,
        token: action.payload,
      };

    case "logout":
      sessionStorage.removeItem("token");
      return {
        ...store,
        token: null,
      };

    default:
      return store;
  }
}

export const loginAction = async (dispatch, email, password) => {
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  try {
    const resp = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/login",
      opts,
    );

    if (resp.status !== 200) {
      alert("Credenciales incorrectas");
      return false;
    }

    const data = await resp.json();
    sessionStorage.setItem("token", data.token);

    dispatch({ type: "set_token", payload: data.token });

    return true;
  } catch (error) {
    console.error("Error en la conexión con el servidor", error);
    return false;
  }
};
