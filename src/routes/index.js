import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import UserProfile from '../pages/UserProfile';
import Signup from '../pages/Signup';
import Signin from '../pages/SignIn'; // Make sure this filename is correct

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "user-profile",
        element: <UserProfile />
      },
      {
        path: "sign-in",
        element: <Signin />
      },
      {
        path: "sign-up",
        element: <Signup />
      }
    ]
  }
]);

export default router;
