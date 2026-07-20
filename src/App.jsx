import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Loader from './components/Loader/Loader';

const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Products = lazy(() => import('./pages/Products/Products'));
const Services = lazy(() => import('./pages/Services/Services'));
const Training = lazy(() => import('./pages/Training/Training'));
const Gallery = lazy(() => import('./pages/Gallery/Gallery'));
const Careers = lazy(() => import('./pages/Careers/Careers'));
const Shopping = lazy(() => import('./pages/Shopping/Shopping'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="services" element={<Services />} />
          <Route path="training" element={<Training />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="careers" element={<Careers />} />
          <Route path="shopping" element={<Shopping />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
