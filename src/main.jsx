import React from 'react';
import ReactDOM from 'react-dom/client'; // Changed import path
import { StrictMode } from 'react'; // Added import for StrictMode
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignInPage from './auth/sign-in';
import { Home } from 'lucide-react';
import Dashboard from './dashboard';
import { ClerkProvider } from '@clerk/clerk-react';
import Homepage from './home';
import EditResume from './dashboard/resume/[resumeId]/edit';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
// Define the routes for your application
const router = createBrowserRouter([
  {

    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element:<EditResume/>
      }
    ]
  },
  {
    path: '/',
    element: <Homepage />
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage />,
  },
]);

// Create the root element and render the RouterProvider with StrictMode
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
