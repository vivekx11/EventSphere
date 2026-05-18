import { Link } from 'react-router-dom';
import { ArrowRight, Calendar as CalendarIcon, MapPin, Users } from 'lucide-react';

const Landing = () => {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 blur-[100px] rounded-full mix-blend-screen animate-float"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Experience Events <br/>
            <span className="text-gradient">Like Never Before</span>
          </h1>
          <p className="mt-4 text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Discover, book, and manage your favorite events all in one place. Join millions of users experiencing the future of event management.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/events" className="btn-primary flex items-center justify-center gap-2">
              Explore Events <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/register" className="btn-secondary">
              Create Event
            </Link>
          </div>
          
          {/* Quick Search */}
          <div className="mt-16 max-w-3xl mx-auto glass-panel p-2 flex flex-col sm:flex-row gap-2">
            <input 
              type="text" 
              placeholder="Search events by name, artist, or venue..." 
              className="flex-1 bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-slate-500"
            />
            <button className="bg-white text-slate-900 hover:bg-slate-200 font-semibold py-3 px-8 rounded-lg transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-800/50 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="glass-panel p-6">
              <Users className="h-10 w-10 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-2">2M+</h3>
              <p className="text-slate-400 font-medium">Active Users</p>
            </div>
            <div className="glass-panel p-6">
              <CalendarIcon className="h-10 w-10 text-violet-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-2">10k+</h3>
              <p className="text-slate-400 font-medium">Events Hosted</p>
            </div>
            <div className="glass-panel p-6">
              <MapPin className="h-10 w-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-2">50+</h3>
              <p className="text-slate-400 font-medium">Cities Worldwide</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
