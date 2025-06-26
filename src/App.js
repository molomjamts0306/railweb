import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';
import AdminPostForm from './components/AdminPostForm';

function App() {
    return (
        <Router>
            <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
                <h1>📰 My News Site</h1>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <AdminPostForm />
                                <NewsList />
                            </>
                        }
                    />
                    <Route path="/post/:id" element={<NewsDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;