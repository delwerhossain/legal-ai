export default function FAQ() {
  const faqs = [
    {
      question: "What is AinBondhu?",
      answer: "AinBondhu is an AI-powered legal assistant designed to help users with legal queries, research, and document analysis."
    },
    {
      question: "Is my data secure with AinBondhu?",
      answer: "Yes! We use industry-standard encryption to protect your data and comply with all relevant legal regulations."
    },
    {
      question: "Can AinBondhu provide official legal advice?",
      answer: "No, AinBondhu provides AI-assisted legal insights but does not replace professional legal consultation. Always consult a lawyer for official legal matters."
    },
    {
      question: "Does AinBondhu support Bangladeshi laws?",
      answer: "Yes, our system is trained to provide legal insights based on Bangladeshi laws and regulations."
    },
    {
      question: "How can I contact support?",
      answer: "You can reach us via email at support@ainbondhu.com or through our contact form on the website."
    }
  ];

  return (
    <div className=" mt-16 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
              <h2 className="text-lg font-semibold">{faq.question}</h2>
              <p className="text-gray-700 dark:text-gray-400 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
