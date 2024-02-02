import './App.css';
import Header from './components/Header';
import Card2 from './components/Card2';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';

function App() {
  

  return (
    <>
      <Header />
          <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/:id" element={<Card2/>} />
          </Routes>
    </>
  );
}

export default App;
