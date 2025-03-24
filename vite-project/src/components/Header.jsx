import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useComparisonContext } from '../context/useComparisonContext';
import { useFavorites } from '../context/useFavoritesContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { comparisonList } = useComparisonContext();
  const { favorites } = useFavorites();
  const { currentUser, logout } = useAuth();

  // Track scrolling to apply different styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setShowProfileMenu(false);
  }, [location.pathname]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowProfileMenu(false);
  };

  return (
    <header 
      className={`${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md' 
          : 'bg-gradient-to-r from-blue-50 to-indigo-50'
      } sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <Link to="/" className="group flex items-center text-2xl font-bold text-blue-600 transition-colors hover:text-blue-700">
              <div className="mr-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 transition-all duration-300 group-hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-110">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">DreamHouse</span>
            </Link>
          </div>

          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" active={location.pathname === '/'}>
              Home
            </NavLink>
            <NavLink to="/search" active={location.pathname === '/search'}>
              Properties
            </NavLink>
            <NavLink to="/favorites" active={location.pathname === '/favorites'}>
              Favorites
              {favorites.length > 0 && (
                <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                  {favorites.length}
                </span>
              )}
            </NavLink>
            <NavLink to="/compare" active={location.pathname === '/compare'}>
              Compare
              {comparisonList.length > 0 && (
                <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                  {comparisonList.length}
                </span>
              )}
            </NavLink>
            <NavLink to="/contact" active={location.pathname === '/contact'}>
              Contact
            </NavLink>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties, locations..."
                className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-4 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mr-1 mt-1 rounded-full bg-blue-500 p-1.5 text-white transition-colors hover:bg-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {!currentUser ? (
              <>
                <Link 
                  to="/login" 
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="profile-menu-container relative ml-3">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 focus:outline-none"
                >
                  <span>{currentUser.name}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link to="/favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Favorites
                    </Link>
                    <Link to="/compare" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Comparisons
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="container mx-auto px-4 py-3 pb-5 space-y-4 border-t border-gray-200">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search properties, locations..."
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-4 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-blue-500 p-1.5 text-white transition-colors hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </form>

          {/* Mobile Navigation */}
          <nav className="flex flex-col space-y-2">
            <MobileNavLink to="/" active={location.pathname === '/'}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/search" active={location.pathname === '/search'}>
              Properties
            </MobileNavLink>
            <MobileNavLink to="/favorites" active={location.pathname === '/favorites'}>
              Favorites
              {favorites.length > 0 && (
                <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                  {favorites.length}
                </span>
              )}
            </MobileNavLink>
            <MobileNavLink to="/compare" active={location.pathname === '/compare'}>
              Compare
              {comparisonList.length > 0 && (
                <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                  {comparisonList.length}
                </span>
              )}
            </MobileNavLink>
            <MobileNavLink to="/contact" active={location.pathname === '/contact'}>
              Contact
            </MobileNavLink>
          </nav>

          {/* Mobile Action Buttons */}
          <div className="flex flex-col space-y-2">
            {!currentUser ? (
              <>
                <Link 
                  to="/login" 
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 text-center font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-center font-medium text-white shadow-sm transition-all hover:from-blue-700 hover:to-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-500">Signed in as</p>
                  <p className="truncate text-sm font-medium text-gray-900">{currentUser.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Desktop Navigation Link
const NavLink = ({ to, active, children }) => (
  <Link
    to={to}
    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      active
        ? 'text-blue-700 bg-blue-50'
        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
    }`}
  >
    {children}
    {active && (
      <span className="absolute bottom-0 left-1/2 h-0.5 w-1/2 -translate-x-1/2 rounded-full bg-blue-600"></span>
    )}
  </Link>
);

// Mobile Navigation Link
const MobileNavLink = ({ to, active, children }) => (
  <Link
    to={to}
    className={`flex items-center justify-between rounded-lg px-4 py-2.5 font-medium ${
      active ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
    }`}
  >
    <div className="flex items-center">
      {children}
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-gray-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  </Link>
);

export default Header;