import { Outlet } from 'react-router-dom';
import BackToTop from '../components/BackToTop';
import Breadcrumbs from '../components/Breadcrumbs';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import ScrollProgress from '../components/ScrollProgress';

export default function MainLayout() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Breadcrumbs />
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
