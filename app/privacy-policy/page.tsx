export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Last Updated: 26 February, 2025</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Data Protection & Security</h2>
          <p className="text-gray-700 dark:text-gray-400">
            AinBondhu follows all relevant **legal and data protection compliances** applicable in Bangladesh and globally.
            All user data is **encrypted** using industry-standard security measures to prevent unauthorized access.
            Your legal queries and interactions remain **private and confidential**.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">How We Use Your Data</h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-400">
            <li>To improve our AI-driven legal assistance services.</li>
            <li>To personalize your experience and provide accurate legal insights.</li>
            <li>To comply with legal obligations and ensure ethical AI usage.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
          <p className="text-gray-700 dark:text-gray-400">
            You have the right to access, modify, or delete your personal data upon request.
            You can choose not to share certain information, but this may limit some functionalities of AinBondhu.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Third-Party Services</h2>
          <p className="text-gray-700 dark:text-gray-400">
            We may use secure third-party tools for enhanced functionality, ensuring they adhere to strict privacy standards.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Updates to This Policy</h2>
          <p className="text-gray-700 dark:text-gray-400">
            We may update our Privacy Policy periodically. Any changes will be **notified on our website**.
          </p>
          <p className="mt-4">
            For any privacy-related concerns, contact us at 
            <a href="mailto:legal@ainbondhu.com" className="text-blue-500 dark:text-blue-400 hover:underline"> legal@ainbondhu.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
