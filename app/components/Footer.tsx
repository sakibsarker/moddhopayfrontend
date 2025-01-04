import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
            <div className="col-span-2">
              <img
                src="/images/wallets.jpg"
                alt="SEAL Logo"
                className="h-8 w-auto"
              />
              <p className="mt-4 text-sm text-gray-500">
                Financial Solutions at Your Fingertips
              </p>
              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-l-lg border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button className="rounded-r-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                  Submit
                </button>
              </div>
            </div>
            {["Products", "Use Cases", "Resources"].map((category) => (
              <div key={category}>
                <h3 className="font-semibold text-gray-900">{category}</h3>
                <ul className="mt-4 space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-sm text-gray-500 hover:text-gray-900"
                      >
                        Link {i}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
