import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

// MSW
import { worker } from './mocks/browser'
if (process.env.NODE_ENV === 'development') {
    worker.start().then(data => data)
}
// MSW end.

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    // <React.StrictMode>
        <App />
    // </React.StrictMode>
)
