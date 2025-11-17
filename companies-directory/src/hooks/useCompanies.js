import { useState, useEffect } from 'react';
import companiesData from '../data/companies.json';

export function useCompanies() {
  // Raw data
  const [allCompanies, setAllCompanies] = useState([]);
  const [visibleCompanies, setVisibleCompanies] = useState([]);

  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');

  // Sorting
  const [sortBy, setSortBy] = useState('name');

  // Pagination
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Load companies
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await new Promise((res) => setTimeout(res, 800));

        setAllCompanies(companiesData.companies || []);
        setLoading(false);
      } catch (e) {
        setError('Failed to load companies');
        setLoading(false);
      }
    };

    load();
  }, []);

  // Filtering + sorting function
  const applyFiltersAndSort = () => {
    let result = [...allCompanies];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.description || '').toLowerCase().includes(q)
      );
    }

    // Industry
    if (industry) {
      result = result.filter((c) => c.industry === industry);
    }

    // Location
    if (location) {
      result = result.filter((c) => c.location === location);
    }

    // Sorting
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'founded') {
      result.sort((a, b) => (b.founded || 0) - (a.founded || 0));
    } else if (sortBy === 'employees') {
      result.sort((a, b) => (b.employees || 0) - (a.employees || 0));
    }

    return result;
  };

  // Update visible companies whenever filters change
  useEffect(() => {
    if (loading) return;

    const filtered = applyFiltersAndSort();

    const totalPagesCalc = Math.ceil(filtered.length / itemsPerPage);
    const page = Math.min(currentPage, totalPagesCalc || 1);

    const start = (page - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);

    setVisibleCompanies(paginated);

    if (page !== currentPage) setCurrentPage(page);
  }, [allCompanies, search, industry, location, sortBy, currentPage, loading]);

  // Unique dropdown lists
  const industries = [...new Set(allCompanies.map((c) => c.industry).filter(Boolean))].sort();
  const locations = [...new Set(allCompanies.map((c) => c.location).filter(Boolean))].sort();

  // Total pages
  const totalFiltered = applyFiltersAndSort().length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;

  return {
    // Main values for App.jsx
    companies: visibleCompanies,
    allCompanies,
    visibleCompanies,

    // States
    loading,
    error,

    // Filters + setters
    search,
    setSearch,
    industry,
    setIndustry,
    location,
    setLocation,

    industries,
    locations,

    // Sorting
    sortBy,
    setSortBy,

    // Pagination
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
  };
}
