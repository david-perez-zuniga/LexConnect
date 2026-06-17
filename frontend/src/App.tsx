import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { RegisterPage } from './pages/RegisterPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/registro',
    element: <RegisterPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App