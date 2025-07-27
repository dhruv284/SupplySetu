import React from 'react';
import { Users, Truck, DollarSign, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const FoodConnectLanding = () => {
  return (
    <div className="relative min-h-screen bg-[#f9fbfa] font-inter overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#e9f2ed] px-10 py-3">
        <Link to="/" className="flex items-center gap-4 text-[#0f1a15]">
          <div className="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold">FoodConnect</h2>
        </Link>

        <nav className="flex items-center gap-9 text-sm font-medium text-[#0f1a15]">
          {['Home', 'Vendors', 'Suppliers', 'About Us', 'Contact Us'].map((item) => (
            <Link
              key={item}
              to="/"
              className="hover:text-[#559174] transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex gap-2">
          <Link
            to="/login"
            className="inline-flex items-center justify-center h-12 px-4 rounded-xl bg-[#84e5b6] text-sm font-bold hover:bg-[#6dd9a4] transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#84e5b6] text-sm font-bold hover:bg-[#6dd9a4] transition"
          >
            Register Now
          </Link>
          <button
            className="h-12 px-2.5 rounded-xl bg-[#e9f2ed] hover:bg-[#d4e6da] transition"
            aria-label="Change Language"
          >
            <Globe size={20} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 sm:px-40 py-10">
        <section
          className="flex min-h-[480px] flex-col justify-center items-center text-center gap-6 sm:rounded-xl p-4 bg-cover bg-center"
          style={{
            backgroundImage:
              `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80")`,
          }}
        >
          <h1 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-tight max-w-4xl">
            Connect with the Best Street Food Vendors and Suppliers in India
          </h1>
          <p className="text-white text-base sm:text-lg max-w-2xl">
            FoodConnect is your one-stop platform to find reliable vendors and suppliers for your street food business.
          </p>
        </section>

        {/* Why Choose */}
        <section className="container mx-auto py-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose FoodConnect?</h2>
          <p className="text-[#0f1a15] mb-10 max-w-xl">
            We provide a comprehensive solution for street food businesses, connecting vendors with suppliers and offering tools for efficient management.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Users size={24} />, title: 'Wide Network', text: 'Access a vast network of verified vendors and suppliers across India.' },
              { icon: <Truck size={24} />, title: 'Reliable Logistics', text: 'Efficient and reliable logistics ensure timely delivery.' },
              { icon: <DollarSign size={24} />, title: 'Secure Payments', text: 'Enjoy secure and transparent payment processing.' },
            ].map(({ icon, title, text }) => (
              <div key={title} className="p-4 border rounded-lg bg-white hover:shadow-lg transition">
                <div className="mb-3 text-[#0f1a15]">{icon}</div>
                <h3 className="text-base font-bold text-[#0f1a15]">{title}</h3>
                <p className="text-sm text-[#559174]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="container mx-auto py-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How FoodConnect Works</h2>
          <p className="text-[#0f1a15] mb-10 max-w-xl">
            Our platform simplifies the process of finding and connecting with vendors and suppliers.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Find Vendors & Suppliers',
                text: 'Easily search and connect with vendors and suppliers.',
                img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80',
              },
              {
                title: 'Manage Orders',
                text: 'Track deliveries and communicate seamlessly.',
                img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
              },
              {
                title: 'Grow Your Business',
                text: 'Expand your reach and grow your street food business.',
                img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
              },
            ].map(({ img, title, text }) => (
              <div key={title} className="flex flex-col gap-3">
                <div
                  className="aspect-video rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${img})` }}
                  aria-label={title}
                />
                <h3 className="text-base font-medium text-[#0f1a15]">{title}</h3>
                <p className="text-sm text-[#559174]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto py-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <Link
            to="/register"
            className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#84e5b6] text-sm font-bold hover:bg-[#6dd9a4] transition"
          >
            Register Now
          </Link>
          <p className="text-sm text-[#559174] mt-4">
            FoodConnect supports all Indian languages and is accessible.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f9fbfa] border-t py-10">
        <div className="container mx-auto text-center flex flex-col gap-6">
          <div className="flex flex-wrap justify-center gap-6">
            {['Terms of Service', 'Privacy Policy', 'Contact Us'].map((link) => (
              <Link
                key={link}
                to="/"
                className="text-base text-[#559174] hover:text-[#0f1a15] transition"
              >
                {link}
              </Link>
            ))}
          </div>
          <p className="text-base text-[#559174]">© 2024 FoodConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FoodConnectLanding;
