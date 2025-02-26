export default function Contact() {
  const teamMembers = [
    {
      name: "Syed Mir Ahsan Habib",
      role: "Team Lead",
      email: "syedmirhabib@gmail.com",
      phone: "01518926700",
    },
    {
      name: "Md Delwer Hossain",
      role: "Team Member",
      email: "",
      phone: "",
    },
    {
      name: "Zarif Tashdeed",
      role: "Team Member",
      email: "",
      phone: "",
    },
    {
      name: "Takee Taszid Tirtha",
      role: "Team Member",
      email: "",
      phone: "",
    },
  ];

  return (
    <div className=" mt-16 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Get in touch with us for any inquiries, collaborations, or legal tech support.
        </p>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Contact Form</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="yourname@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea
                className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={4}
                placeholder="Your message..."
              ></textarea>
            </div>
            <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-80 transition">
              Send Message
            </button>
          </form>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Our Team</h2>
        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-700 dark:text-gray-400">{member.role}</p>
              {member.email && (
                <p className="text-gray-500 dark:text-gray-400">
                  Email: <a href={`mailto:${member.email}`} className="text-primary hover:underline">{member.email}</a>
                </p>
              )}
              {member.phone && (
                <p className="text-gray-500 dark:text-gray-400">
                  Phone: <a href={`tel:${member.phone}`} className="text-primary hover:underline">{member.phone}</a>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
