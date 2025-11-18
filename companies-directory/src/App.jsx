import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from './Pages/Home';
import About from './Pages/AboutSection';
import { useCompanies } from './hooks/useCompanies';

function App() {

  const hook = useCompanies();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header is always visible */}
      <Header search={hook.search} setSearch={hook.setSearch} />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home hook={hook} />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="flex max-w-7xl justify-center gap-5 px-4 sm:px-6 lg:px-8 py-6">
          {/* Companies Count */}
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">1K+</div>
            <div className="text-gray-500 text-sm">Companies</div>
          </div>
          {/* Industries Count */}
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">50+</div>
            <div className="text-gray-500 text-sm">Industries</div>
          </div>
        </div>
        <p className="text-center text-gray-500">
          Companies Directory © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;


