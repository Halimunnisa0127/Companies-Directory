// src/Pages/Home.jsx
import { useState } from "react";
import FilterControls from "../Components/FilterControls";
import CompanyCard from "../Components/CompanyCard";
import Pagination from "../Components/Pagination";
import LoadingSpinner from "../Components/LoadingSpinner";

export default function Home({ hook }) {
  const [isOpen, setIsOpen] = useState(false);

  // use the hook that App passed down (do NOT call useCompanies() again here)
  const companies = hook.companies || hook.visibleCompanies || [];
  const allCompanies = hook.allCompanies || [];

  const loading = hook.loading ?? false;
  const error = hook.error ?? null;

  const filters = hook.filters ?? {
    search: hook.search ?? "",
    industry: hook.industry ?? "",
    location: hook.location ?? "",
  };

  const updateFilters = hook.updateFilters
    ? hook.updateFilters
    : (newFilters) => {
        if (hook.setSearch && newFilters.search !== undefined)
          hook.setSearch(newFilters.search);
        if (hook.setIndustry && newFilters.industry !== undefined)
          hook.setIndustry(newFilters.industry);
        if (hook.setLocation && newFilters.location !== undefined)
          hook.setLocation(newFilters.location);
        if (hook.setFilters) hook.setFilters(newFilters);
      };

  const sortBy = hook.sortBy ?? "name";
  const setSortBy = hook.setSortBy ?? (() => {});
  const currentPage = hook.currentPage ?? 1;
  const setCurrentPage = hook.setCurrentPage ?? (() => {});
  const totalPages = hook.totalPages ?? 1;

  const industries = hook.industries ?? [];
  const locations = hook.locations ?? [];

  if (error) {
    return <div>Error loading data: {String(error)}</div>;
  }

  return (
    <>
      <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Floating Filter Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="sticky top-28 left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition "
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V19a1 1 0 
         01-1.447.894l-4-2A1 1 0 019 17v-4.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
        </button>

        {/* Active Filters Display */}
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.search && (
            <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {filters.search}
              <button
                className="ml-2 text-blue-700"
                onClick={() => updateFilters({ ...filters, search: "" })}
              >
                ✕
              </button>
            </div>
          )}

          {filters.industry && (
            <div className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              {filters.industry}
              <button
                className="ml-2 text-green-700"
                onClick={() => updateFilters({ ...filters, industry: "" })}
              >
                ✕
              </button>
            </div>
          )}

          {filters.location && (
            <div className="flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
              {filters.location}
              <button
                className="ml-2 text-purple-700"
                onClick={() => updateFilters({ ...filters, location: "" })}
              >
                ✕
              </button>
            </div>
          )}

          {(filters.search || filters.industry || filters.location) && (
            <button
              className="text-sm text-red-600 font-medium underline ml-2"
              onClick={() =>
                updateFilters({ search: "", industry: "", location: "" })
              }
            >
              Clear all
            </button>
          )}
        </div>

        {/* Drawer Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl border-r border-gray-200 
            transform transition-transform duration-300 z-50
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Filters & Sorting</h2>
            <button onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 hover:text-red-500 transition"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

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
        <div className="mb-6 mt-4">
          <p className="text-gray-600">
            Showing {companies.length} of {allCompanies.length} companies
            {(filters.search || filters.industry || filters.location) ? " (filtered)" : ""}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-12">
            <LoadingSpinner />
          </div>
        )}

        {/* No Results */}
        {!loading && !error && companies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No companies found</h2>
            <p className="text-gray-600">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
          </div>
        )}

        {/* Companies List */}
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
    </>
  );
}
