import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header({ search, setSearch }) {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Wrapper */}
                <div className="
                    flex items-center justify-between py-4
                ">

                    {/* Title */}
                    <h1 className="
                        text-2xl sm:text-3xl font-bold
                        bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400
                        text-transparent bg-clip-text
                    ">
                        Companies Directory
                    </h1>

                    {/* Search for large screens */}
                    <div className="hidden md:flex w-1/3">
                        <input
                            type="text"
                            placeholder="Search companies..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="
                                w-full py-2 px-4 rounded-xl 
                                border border-gray-300 shadow-sm 
                                focus:ring-2 focus:ring-blue-400 outline-none
                            "
                        />
                    </div>

                    {/* Hamburger Button (Mobile) */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-gray-700 focus:outline-none"
                    >
                        {menuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-10 text-gray-700 font-medium">
                        <Link to="/" className="hover:text-blue-600">Home</Link>
                        <Link to="/about" className="hover:text-blue-600">About</Link>
                    </nav>
                </div>

                {/* Search Bar + Menu for Mobile */}
                {menuOpen && (
                    <div className="md:hidden flex flex-col gap-4 pb-4">

                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search companies..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="
                                w-full py-2 px-4 rounded-xl 
                                border border-gray-300 shadow-sm 
                                focus:ring-2 focus:ring-blue-400 outline-none
                            "
                        />

                        {/* Mobile Navigation */}
                        <nav className="flex flex-col gap-3 text-gray-700 font-medium text-lg">
                            <Link
                                to="/"
                                onClick={() => setMenuOpen(false)}
                                className="hover:text-blue-600"
                            >
                                Home
                            </Link>

                            <Link
                                to="/about"
                                onClick={() => setMenuOpen(false)}
                                className="hover:text-blue-600"
                            >
                                About
                            </Link>
                        </nav>
                    </div>
                )}

            </div>
        </header>
    );
}
