import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Todo from '../Todo/Todo';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import SearchResults from '../Todo/SearchResults'; 

function Home() {
  return (
    <div className="App">
        <div className="nav">
            <Navbar />
        </div>
        <div className="sidebar">
            <Sidebar />
        </div>
        <div className="App1">
            <header className="App-header">
                <Routes>
                    <Route path="/" element={<Todo />} />
                    <Route path="/search-results" element={<SearchResults />} />
                </Routes>
            </header>
        </div>
    </div>
);
}

export default Home;