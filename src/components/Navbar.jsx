import { Link } from 'react-router-dom';
import { Calendar, Menu, X, User } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Calendar className="h-8 w-8 text-violet-500" />
              <span className="font-bold text-xl text-white tracking-tight">Event<span className="text-gradient">Hub</span></span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Home</Link>
            <Link to="/events" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Events</Link>
            <Link to="/about" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">About</Link>
            <Link to="/contact" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Log in</Link>
            <Link to="/register" className="btn-primary text-sm">Sign up</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-x-0 border-t-0 rounded-none absolute w-full left-0 mt-0">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md">Home</Link>
            <Link to="/events" className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md">Events</Link>
            <Link to="/login" className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md">Log in</Link>
            <Link to="/register" className="block px-3 py-2 text-base font-medium text-violet-400 hover:text-violet-300 hover:bg-slate-800 rounded-md">Sign up</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
