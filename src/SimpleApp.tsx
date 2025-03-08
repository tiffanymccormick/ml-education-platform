import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Home = () => (
  <div className="p-8 bg-background text-foreground min-h-screen">
    <h1 className="text-4xl font-bold mb-6">Machine Learning Magic</h1>
    <p className="mb-4">Welcome to the simplified test version of the app.</p>
    <div className="flex gap-4">
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded">Home</Link>
      <Link to="/about" className="px-4 py-2 bg-blue-600 text-white rounded">About</Link>
    </div>
  </div>
);

const About = () => (
  <div className="p-8 bg-background text-foreground min-h-screen">
    <h1 className="text-4xl font-bold mb-6">About</h1>
    <p className="mb-4">This is a simplified test page.</p>
    <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded">Back to Home</Link>
  </div>
);

const SimpleApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SimpleApp; 