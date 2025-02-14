import { memo, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Layout And Pages
import MainLayout from './layouts/MainLayout';
import TableReserve from './pages/TableReserve';
import About from './pages/About';
import CheckCheckout from './pages/CheckCheckout';
const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/Cart'));
const EachItem = lazy(() => import('./pages/EachItem'));
const Login = lazy(() => import('./pages/Login'));
const Orders = lazy(() => import('./pages/Orders'));
const Account = lazy(() => import('./pages/Account'));
const Favorite = lazy(() => import('./pages/Favorite'));
const Checkout = lazy(() => import('./pages/Checkout'));

const AllRoutes = memo(function AllRoutes() {
  return (
    <Suspense fallback={<h1>loading ...</h1>}>
      <Routes>
        <Route
          path='/'
          element={<MainLayout />}>
          <Route
            index
            element={<Home />}
          />
          <Route
            path='/item/*'
            element={<EachItem />}
          />
          <Route
            path='/cart'
            element={<Cart />}
          />
          <Route
            path='/favorite'
            element={<Favorite />}
          />
          <Route
            path='/checkout'
            element={<Checkout />}
          />
          <Route
            path='/account'
            element={<Account />}
          />
          <Route
            path='/orders'
            element={<Orders />}
          />
          <Route
            path='/table-reserve'
            element={<TableReserve />}
          />
          <Route
            path='/about'
            element={<About />}
          />
        </Route>
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/checkout/check'
          element={<CheckCheckout />}
        />
      </Routes>
    </Suspense>
  );
});
export default AllRoutes;
