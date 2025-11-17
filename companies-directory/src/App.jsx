import './App.css';
import { useCompanies } from './hooks/useCompanies';
import CompanyCard from './Components/CompanyCard';
import FilterControls from './Components/FilterControls';
import Pagination from './Components/Pagination';
import LoadingSpinner from './Components/LoadingSpinner';
import { useState } from 'react';


function App() {
  // Keep the hook result as a single object so we can gracefully map different names
  const hook = useCompanies();
  const [isOpen, setIsOpen] = useState(false);

  // Map values from either the "original" hook shape or the "simplified" hook shape.
  // This keeps the App component flexible while being easy to read.
  const companies = hook.companies || hook.visibleCompanies || [];
  const allCompanies = hook.allCompanies || hook.allFilteredCompanies || [];
  const loading = hook.loading ?? false;
  const error = hook.error ?? null;

  // Filters: some hooks returned a single `filters` object, others exposed separate fields.
  const filters = hook.filters ?? {
    search: hook.search ?? '',
    industry: hook.industry ?? '',
    location: hook.location ?? '',
  };

  // Update functions: prefer explicit setters if present, otherwise provide helper wrappers
  const updateFilters = hook.updateFilters
    ? hook.updateFilters
    : (newFilters) => {
      // Try to call individual setters if available
      if (hook.setSearch && typeof newFilters.search !== 'undefined') hook.setSearch(newFilters.search);
      if (hook.setIndustry && typeof newFilters.industry !== 'undefined') hook.setIndustry(newFilters.industry);
      if (hook.setLocation && typeof newFilters.location !== 'undefined') hook.setLocation(newFilters.location);
      // If the hook supports a full-update call, try that too
      if (hook.setFilters) hook.setFilters(newFilters);
    };

  const sortBy = hook.sortBy ?? 'name';
  const setSortBy = hook.setSortBy ?? ((v) => { if (hook.setSortBy) hook.setSortBy(v); });

  const currentPage = hook.currentPage ?? 1;
  const setCurrentPage = hook.setCurrentPage ?? ((p) => { if (hook.setCurrentPage) hook.setCurrentPage(p); });

  const totalPages = hook.totalPages ?? Math.max(1, Math.ceil((allCompanies.length || 0) / (hook.itemsPerPage || 6)));
  const industries = hook.industries ?? [];
  const locations = hook.locations ?? [];

  // Simple UI states displayed when there is an error or loading
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h1>
          <p className="text-gray-600">{String(error)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200  top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between py-6 gap-6">

            {/* Left: Title */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text text-center lg:text-left">
              Companies Directory
            </h1>

            {/* Center: Search Bar */}
            <div className="w-full lg:w-1/3 flex justify-center">
              <input
                type="text"
                placeholder="Search companies..."
                value={hook.search}
                onChange={(e) => hook.setSearch(e.target.value)}
                className="w-full py-2 px-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Right: Stats */}
            <div className="flex flex-row items-center gap-8">

              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1K+</div>
                <div className="text-gray-500 text-sm">Companies</div>
              </div>

              <div className="w-px h-8 bg-gray-300 hidden sm:block"></div>

              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">50+</div>
                <div className="text-gray-500 text-sm">Industries</div>
              </div>
            </div>

          </div>
        </div>
      </header>



      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl ">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Text */}
            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed text-justify">
                The Companies Directory is a comprehensive platform designed to help users discover,
                explore, and connect with businesses across various industries.
                It serves as a centralized hub for company information, making it easier to find potential employers,
                partners, or investment opportunities.<br />
                The directory supports multiple use cases-from job seekers searching for employment opportunities to business professionals looking for partnerships or competitive insights.
                With features such as company statistics, industry categorization, and advanced search capabilities,
                it offers a data-rich experience that organizes business information in an accessible and user-friendly way.<br />
                The design elements, including the sticky header and call-to-action buttons,
                reflect a user-centric approach that prioritizes easy navigation and quick access to important features.
                This makes the platform suitable for both casual browsing and focused, research-driven exploration.
              </p>
            </div>

            {/* Image from public/ */}
            <div className="w-full md:w-1/3 flex-shrink-0 ">
              <img
                src="https://plus.unsplash.com/premium_photo-1676357175446-8e85f2205ea6?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Illustration representing companies directory project"
                className="w-full h-75 rounded-lg shadow-md border"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        {/* Floating Filter Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="stick top-34 left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50 "
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V19a1 1 0 
         01-1.447.894l-4-2A1 1 0 019 17v-4.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
        </button>

        {/* Filter Controls
            - We pass simple, direct props so the FilterControls component is easy to use.
            - It should call updateFilters({ search, industry, location }) or call the provided setters.
        */}

        {/* Sidebar Drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl border-r border-gray-200 
              transform transition-transform duration-300 z-50
             ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Filters & Sorting
            </h2>

            <button onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 hover:text-red-500 transition"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Put your existing FilterControls inside Drawer */}
          <div className="p-5 overflow-y-auto h-full">
            <FilterControls
              filters={filters}
              updateFilters={updateFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
              industries={industries}
              locations={locations}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 " >
          <p className="text-gray-600">
            Showing {companies.length} of {allCompanies.length} companies
            {(filters.search || filters.industry || filters.location) ? ' (filtered)' : ''}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-12">
            <LoadingSpinner />
          </div>
        )}

        {/* Empty state (no results) */}
        {!loading && !error && companies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No companies found</h2>
            <p className="text-gray-600">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
          </div>
        )}

        {/* Companies Grid */}
        {!loading && !error && companies.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => setCurrentPage(p)}
              />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">
            Companies Directory &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
