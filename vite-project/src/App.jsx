import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import FavoritesPage from './pages/FavoritesPage';
import ComparisonPage from './pages/ComparisonPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './components/PrivateRoute';
import { FilterProvider } from './context/FilterContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <FilterProvider>
          <FavoritesProvider>
            <ComparisonProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/property/:id" element={<PropertyDetailsPage />} />
                    <Route path="/search" element={<SearchResultsPage />} />
                    <Route
                      path="/favorites"
                      element={
                        <PrivateRoute>
                          <FavoritesPage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/compare"
                      element={
                        <PrivateRoute>
                          <ComparisonPage />
                        </PrivateRoute>
                      }
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </ComparisonProvider>
          </FavoritesProvider>
        </FilterProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
