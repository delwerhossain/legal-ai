"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Labor Laws in Bangladesh",
    description: "A deep dive into labor rights, wages, and employment policies in BD.",
    category: "Labor Law",
    date: "Feb 20, 2025",
    image: "/images/labor-law.jpg",
  },
  {
    id: 2,
    title: "How to File a Case in Bangladesh – A Step-by-Step Guide",
    description: "A complete guide on filing legal cases and dealing with the judiciary.",
    category: "Legal Process",
    date: "Feb 18, 2025",
    image: "/images/court-case.jpg",
  },
  {
    id: 3,
    title: "Cybercrime Laws in Bangladesh – What You Need to Know",
    description: "Stay safe online by understanding the Digital Security Act and ICT laws.",
    category: "Cyber Law",
    date: "Feb 15, 2025",
    image: "/images/cyber-law.jpg",
  },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("");

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filteredCategory ? post.category === filteredCategory : true)
  );

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 AinBondhu Blog</h1>
      <p className="text-gray-500 text-center mb-8">
        Get insights into Bangladesh's legal system, laws, and AI-powered legal solutions.
      </p>

      {/* Search & Filter Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-200/80 border border-gray-300 rounded-lg p-3 w-full sm:w-1/2 shadow-md">
          <Search className="w-5 h-5 text-gray-600" />
          <input
            type="text"
            placeholder="Search legal topics..."
            className="bg-transparent text-black ml-3 w-full outline-none placeholder-gray-500"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <select
          className="bg-gray-200/80 border border-gray-300 text-gray-700 p-3 rounded-lg w-full sm:w-1/3 shadow-md"
          onChange={(e) => setFilteredCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Labor Law">Labor Law</option>
          <option value="Legal Process">Legal Process</option>
          <option value="Cyber Law">Cyber Law</option>
        </select>
      </div>

      {/* Blog Posts Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block">
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors shadow-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-lg font-semibold mt-3">{post.title}</h2>
                <p className="text-gray-500 mt-1 text-sm">{post.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No blog posts found.</p>
        )}
      </div>
    </div>
  );
}
