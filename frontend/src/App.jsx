import { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navigation from './Components/Navigation/Navigation';
import HomePage from './Pages/Home';
import Footer from './Components/Footer/Footer';
import GalleryPage from './Pages/Gallery';
import AdminPanel from './Pages/AdminPanel';
import ResetPasswordPage from './Pages/ResetPasswordPage';

function App() {

  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);
  const faqRef = useRef(null);


  return (
    <Router>
    <div className="min-h-screen bg-white">
      <Navigation refs= {{ aboutRef, servicesRef, faqRef, contactRef }}/>

      <Routes>
        <Route path='/' 
              element={
                <HomePage
                  aboutRef={aboutRef}
                  servicesRef={servicesRef}
                  faqRef={faqRef}
                  contactRef={contactRef}
                />
              }  
        />
        <Route path='/gallery' element={<GalleryPage/>}/>
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage/>} />
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
