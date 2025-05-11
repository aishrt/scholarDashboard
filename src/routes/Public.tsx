import { Navigate, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import NotFound from '../pages/OtherPage/NotFound';
import SignIn from '../pages/AuthPages/SignIn';
import ErrorPage from '../pages/OtherPage/ErrorPage';
import { ScrollToTop } from '../components/common/ScrollToTop';
import ForgotPassword from '../pages/AuthPages/ForgotPassword';
const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Suspense fallback={<div className="w-screen h-screen alignmentLogo">Any Image Here</div>}>
        <Outlet></Outlet>
      </Suspense>
    </div>
  );
};

export const publicRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <SignIn /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/error', element: <ErrorPage /> },
      { path: '/not-found', element: <NotFound /> },
      { path: '*', element: <Navigate to="/not-found" /> },
    ],
  },
];

