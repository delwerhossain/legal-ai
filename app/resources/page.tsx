export default function Resources() {
  const resources = [
    {
      title: "Bangladesh Constitution",
      description: "Read the full Constitution of Bangladesh for legal references.",
      link: "https://www.parliament.gov.bd/index.php/en/constitution-of-bangladesh",
    },
    {
      title: "Bangladesh Penal Code",
      description: "Detailed information on criminal laws applicable in Bangladesh.",
      link: "https://bdlaws.minlaw.gov.bd/act-11.html",
    },
    {
      title: "Legal Aid Services",
      description: "Free legal aid services provided by the Bangladesh government.",
      link: "http://nlaso.gov.bd/",
    },
    {
      title: "High Court & Supreme Court Cases",
      description: "Access important judgments and legal precedents in Bangladesh.",
      link: "http://www.supremecourt.gov.bd/",
    },
    {
      title: "AinBondhu Legal Guides",
      description: "Step-by-step guides on common legal issues in Bangladesh.",
      link: "#",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-12 mt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Legal Resources</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Find useful legal references, official documents, and free legal aid services related to Bangladeshi law.
        </p>

        <div className="space-y-6">
          {resources.map((resource, index) => (
            <div key={index} className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
              <h2 className="text-lg font-semibold">{resource.title}</h2>
              <p className="text-gray-700 dark:text-gray-400 mt-2">{resource.description}</p>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary mt-3 inline-block hover:underline"
              >
                Access Resource →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
