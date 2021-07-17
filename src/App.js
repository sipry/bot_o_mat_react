import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Generate from './components/Generate';
import Task from './components/Task';
import Create from './components/Create';

function App() { 
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/generate" exact component={Generate} />
        <Route path="/task/:id" exact component={Task} />
        <Route path="/create" exact component={Create} />
      </div>
    </Router>
  );
}

export default App;
