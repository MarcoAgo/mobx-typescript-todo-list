import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import TodoList from "./todoList/TodoList"
import { QueryClient, QueryClientProvider } from "react-query"
import TodoListStore from "./todoList/store/TodoListStore"
import { Provider } from "mobx-react"
import { Dimmer, Loader } from "semantic-ui-react"
import DialogStore from './todoList/store/DialogStore'
import CustomModal from './todoList/components/modals/Modal'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const store = {
  list: new TodoListStore({ }),
  dialogs: new DialogStore(),
};

function App() {
  const renderLoader = () => (
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
  )

  return (
    <Provider {...store}>
      <QueryClientProvider client={queryClient}>
        <div id="app">
          <React.Suspense fallback={renderLoader()}>
            <TodoList />
            <CustomModal />
          </React.Suspense>
        </div>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
