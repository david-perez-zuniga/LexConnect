import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/registro',
    element: <RegisterPage />,
  },
  {
    path: '/iniciar-sesion',
    element: <LoginPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App