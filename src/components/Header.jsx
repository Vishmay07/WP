import { HomeIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="Company Logo" className="h-12 w-auto rounded-full shadow-md" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-white tracking-wide">
          Padhariya <span className="text-yellow-300">International</span>
        </h1>

        {/* Home Icon */}
        <Link
          to="/"
          className="text-white hover:text-yellow-300 transition-transform transform hover:scale-110"
        >
          <HomeIcon className="h-8 w-8" />
        </Link>
      </div>
    </header>
  );
}
