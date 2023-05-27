import { Routes, Route } from 'react-router-dom';

import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import Error404Page from '../Error404Page/Error404Page';
import UpdateOrderPage from '../UpdateOrderPage/UpdateOrderPage';

interface IRouter {
  path: string;
  element: React.ReactNode | null;
}

const routes: IRouter[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/page/:pageParam/',
    element: <HomePage />,
  },
  {
    path: '/orders/:id/',
    element: <UpdateOrderPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Error404Page />,
  },
];

export default function App() {
  return (
    <Routes>
      {routes.map((element, index) => {
        return (
          <Route key={index} path={element.path} element={element.element} />
        );
      })}
    </Routes>
  );
}
