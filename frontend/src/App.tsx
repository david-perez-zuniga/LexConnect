import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'

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
  {
    path: '/completar-perfil',
    element: <ProfilePage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App