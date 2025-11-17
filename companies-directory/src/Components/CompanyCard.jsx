
const CompanyCard = ({ company }) => {
    return (
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1"></div>
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{company.logo}</div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {company.industry}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{company.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{company.description}</p>

                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                        <span className="font-medium w-20">Location:</span>
                        <span>{company.location}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-medium w-20">Founded:</span>
                        <span>{company.founded}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-medium w-20">Employees:</span>
                        <span>{company.employees.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-medium w-20">Revenue:</span>
                        <span>{company.revenue}</span>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2 text-sm">
                        <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Website
                        </a>
                        <span className="text-gray-300">•</span>
                        <a
                            href={`mailto:${company.email}`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Email
                        </a>
                        <span className="text-gray-300">•</span>
                        <a
                            href={`tel:${company.phone}`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            {company.phone}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyCard;