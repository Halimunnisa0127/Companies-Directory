// src/components/About.jsx
export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center gap-6">

        {/* Text */}
        <div className="flex-1">
          <p className="text-gray-700 leading-relaxed text-justify">
            The Companies Directory is a comprehensive platform designed to help users discover,
            explore, and connect with businesses across various industries.
            It serves as a centralized hub for company information, making it easier to find potential employers,
            partners, or investment opportunities.<br /><br />
            The directory supports multiple use cases—from job seekers searching for employment opportunities
            to business professionals looking for partnerships or competitive insights.
            With features such as company statistics, industry categorization, 
            and advanced search capabilities, it offers a data-rich experience.<br /><br />
            The design elements, including the sticky header and call-to-action buttons,
            reflect a user-centric approach that prioritizes easy navigation and accessibility.
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <img
            src="https://plus.unsplash.com/premium_photo-1676357175446-8e85f2205ea6?q=80&w=387&auto=format&fit=crop"
            alt="About Companies Directory"
            className="w-full h-75 rounded-lg shadow-md border"
          />
        </div>

      </div>
    </div>
  );
}
