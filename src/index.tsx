import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { Provider } from 'react-redux'
import store from './features/store/store'

// MSW
import { worker } from './mocks/browser'
if (process.env.NODE_ENV === 'development') {
    worker.start({ onUnhandledRequest: 'bypass' }).then(data => data)
}
// MSW end.

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
    // </React.StrictMode>
)
