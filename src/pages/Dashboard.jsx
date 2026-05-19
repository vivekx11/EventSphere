// dashboard.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { LogOut, Calendar, Clock, MapPin, Search } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch user data from firestore
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center text-white">Loading...</div>;
  }

  // Dummy events
  const upcomingEvents = [
    { id: 1, title: 'Tech Innovation Summit', date: 'Oct 15, 2026', time: '09:00 AM', location: 'San Francisco, CA', price: 299, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60' },
    { id: 2, title: 'Global Music Festival', date: 'Nov 02, 2026', time: '04:00 PM', location: 'London, UK', price: 150, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60' },
    { id: 3, title: 'Design Masters Workshop', date: 'Nov 18, 2026', time: '10:00 AM', location: 'Virtual', price: 49, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60' }
  ];

  return (
    <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-8">
      {/* Sidebar Profile */}
      <div className="w-full md:w-64 flex flex-col gap-4">
        <div className="glass-panel p-6 text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 mx-auto mb-4 p-1">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{userData?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">{userData?.name || 'User'}</h3>
          <p className="text-sm text-slate-400 mb-6">{user?.email}</p>
          
          <button 
            onClick={handleLogout}
            className="w-full glass-panel hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 text-slate-300 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        <div className="glass-panel p-4 flex flex-col gap-2">
          <button className="text-left px-4 py-2 rounded-lg bg-slate-800 text-white font-medium">Dashboard</button>
          <button className="text-left px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">My Bookings</button>
          <button className="text-left px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">Wishlist</button>
          <button className="text-left px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">Settings</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400">Welcome back, here's what's happening.</p>
          </div>
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-4">Upcoming Events</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {upcomingEvents.map(event => (
            <div key={event.id} className="glass-panel overflow-hidden group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700/50">
                  <span className="text-sm font-bold text-white">${event.price}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors line-clamp-1">{event.title}</h3>
                
                <div className="space-y-2 mb-4 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-violet-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-cyan-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>

                <button className="w-full btn-primary py-2 text-sm">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
