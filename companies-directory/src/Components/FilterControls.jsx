
const FilterControls = ({ filters, updateFilters, sortBy, setSortBy, industries, locations }) => {
    const handleFilterChange = (key, value) => {
        updateFilters({
            ...filters,
            [key]: value
        });
    };

    const clearFilters = () => {
        updateFilters({
            industry: '',
            location: ''
        });
    };

    const hasActiveFilters = filters.search || filters.industry || filters.location;

    return (
       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <div className="grid grid-cols-1 gap-4">

        {/* Industry Filter */}
        <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                Industry
            </label>
            <select
                id="industry"
                value={filters.industry}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Industries</option>
                {industries.map(industry => (
                    <option key={industry} value={industry}>
                        {industry}
                    </option>
                ))}
            </select>
        </div>

        {/* Location Filter */}
        <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
            </label>
            <select
                id="location"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Locations</option>
                {locations.map(location => (
                    <option key={location} value={location}>
                        {location}
                    </option>
                ))}
            </select>
        </div>

        {/* Sort */}
        <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
            </label>
            <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="name">Name (A-Z)</option>
                <option value="founded">Recently Founded</option>
                <option value="employees">Employee Count</option>
            </select>
        </div>
    </div>

    {/* Clear Filters */}
    {hasActiveFilters && (
        <div className="mt-4">
            <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
                Clear All Filters
            </button>
        </div>
    )}
</div>

    );
};

export default FilterControls;



