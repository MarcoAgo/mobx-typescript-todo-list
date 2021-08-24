import React from 'react';
import TodoList from "./todoList/TodoList";
import { QueryClient, QueryClientProvider } from "react-query";
import TodoListStore from "./todoList/store/TodoListStore";
import { Provider } from "mobx-react";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const store = {
	list: new TodoListStore({}),
};

function App() {
  return (
  	<Provider {...store}>
		  <QueryClientProvider client={queryClient}>
			  <div className="App">
				  <p>MobX state manager</p>
				  <TodoList />
			  </div>
		  </QueryClientProvider>
	  </Provider>
  )
}

export default App
