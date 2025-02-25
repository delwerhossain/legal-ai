import Head from "next/head";

export default function PricePolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <h2>Price Policy - AinBondhu</h2>
        <meta name="description" content="AinBondhu Price Policy" />
      </Head>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Price Policy</h1>
        <p className="text-gray-600 mb-4">
          Our pricing model is designed to be transparent and accessible. Below
          are the details of our price structure.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Free Plan</h2>
        <p className="text-gray-600">
          - Limited access to AinBondhu chat.<br />
          - Up to 10 queries per month.<br />
          - Basic legal information, not professional advice.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Pro Plan - $19.99/month</h2>
        <p className="text-gray-600">
          - Unlimited AI chat access.<br />
          - Advanced legal insights.<br />
          - Priority support.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Enterprise Plan - Custom Pricing</h2>
        <p className="text-gray-600">
          - AI-assisted legal document drafting.<br />
          - API integration for businesses.<br />
          - Dedicated AinBondhu consultant.
        </p>

        <p className="text-gray-500 text-sm mt-6">
          Note: Prices are subject to change. Please check regularly for updates.
        </p>
      </div>
    </div>
  );
}
