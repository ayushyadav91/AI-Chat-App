import AppRoutes from "./routes/AppRoutes"
import { UserProvider } from './context/user.context'


function App() {
 
  return (
    <>
    <UserProvider>
       <AppRoutes />
    </UserProvider>
      <h1 className='text-red-500'>OWN Software Project AI Developer</h1>
    </>
  )
}

export default App
