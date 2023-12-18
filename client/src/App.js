import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.js";
import About from "./Pages/About.js";
import Contact from './Pages/Contact.js'
import Policy from './Pages/Policy.js'
import PagenotFound from './Pages/PagenotFound.js'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path='/contact' element = {<Contact />}/>
        <Route path='/policy' element = {<Policy />}/>
        <Route path='/*' element = {<PagenotFound />}/>
      </Routes>
    </>
  );
}

export default App;
