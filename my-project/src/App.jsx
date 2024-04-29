import React, { Suspense, lazy, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// layouts components
import Header from './layout/Header';
const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));
const SingleTask = lazy(() => import("./components/SingleTask"));
const ErrorPage = lazy(() => import("./components/Pages/ErrorPage"));
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

import { useMyProfileQuery } from './redux/APIs/userapi';
import { setUser } from './redux/features/userReducer';

// loading bar 
import { MainLoading } from './components/loader/MainLoading';

// toast imports 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.userState);

  const { data } = useMyProfileQuery();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data))
    }
  }, [data])

  return (
    <BrowserRouter>
      <ToastContainer />
      {isAuthenticated && <Header />}
      <Suspense fallback={<MainLoading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/singleTask/:id" element={<SingleTask />} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Profile />} />
          </Route>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
