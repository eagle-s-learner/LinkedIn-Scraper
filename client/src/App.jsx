import { createBrowserRouter, RouterProvider } from "react-router-dom"
import JobDetails from "./components/JobDetails"
import ProfileDetails from "./components/ProfileDetails"
import NavBar from "./components/NavBar"

function App() {
    const router = createBrowserRouter([
        {path: '/', element: <NavBar />},
        {path: '/job-detail', element: <JobDetails />},
        {path: '/profile-detail', element: <ProfileDetails />}
    ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
