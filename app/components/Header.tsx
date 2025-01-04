import React from "react";
import { Link } from "react-router";
import { NavLink } from "react-router";
export default function Header() {
  return (
    <div>
      <nav className="border-b border-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <img
              src="/images/wallets.jpg"
              alt="SEAL Logo"
              className="h-8 w-auto"
            />
            <div className="ml-10 hidden space-x-8 lg:block">
              <NavLink
                to="/"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Products
              </NavLink>
            </div>
          </div>
          <Link
            to="/login"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Open an Account
          </Link>
        </div>
      </nav>
    </div>
  );
}
