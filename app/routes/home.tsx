import Header from "~/components/Header";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import {
  MdArrowForward,
  MdCheckCircle,
  MdChevronLeft,
  MdChevronRight,
  MdBolt,
  MdShield,
  MdSpeed,
} from "react-icons/md";
import Footer from "~/components/Footer";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moddhopay" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const features = [
    {
      icon: <MdBolt className="h-6 w-6 text-blue-600" />,
      title: "Fast",
      description:
        "Automatically process transfers in real-time to maximize throughput efficiency.",
    },
    {
      icon: <MdSpeed className="h-6 w-6 text-blue-600" />,
      title: "Instant",
      description:
        "Fully automate the payment lifecycle without the need for custom coding.",
    },
    {
      icon: <MdShield className="h-6 w-6 text-blue-600" />,
      title: "Secure",
      description:
        "Eliminate concerns over risks such as insufficient and transaction failures.",
    },
    {
      icon: <MdArrowForward className="h-6 w-6 text-blue-600" />,
      title: "Build for Scale",
      description:
        "Drive down costs, scale transactions and adapt payments as a strength.",
    },
  ];

  const benefits = [
    {
      title: "Unlimited Merchants",
      icon: <MdCheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Free of Charge",
      icon: <MdCheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Available Anywhere & Anytime",
      icon: <MdCheckCircle className="h-5 w-5 text-green-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Financial Solutions at Your Fingertips
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Empower your financial decisions with our suite of cutting-edge
              tools and insights, designed to enhance your financial strategy.
            </p>
            <div className="mt-8">
              <Link
                to="/login"
                className="rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white hover:bg-gray-800"
              >
                Open an Account
              </Link>
            </div>
            <div className="mt-8">
              <p className="text-sm text-gray-500">
                Companies using our products
              </p>
              <div className="mt-4 flex space-x-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full bg-gray-200" />
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/wallets.jpg"
              alt="App Interface"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 transition-all hover:shadow-xl"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Virtual Card Benefits Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Card Preview */}
          <div className="relative overflow-hidden">
            <div className="relative aspect-[4/3]">
              <img
                src="/images/wallets.jpg"
                alt="Virtual Card Preview"
                className="h-full w-screen rounded-2xl  object-cover"
              />
            </div>
          </div>

          {/* Benefits Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Enjoy Benefits Our Virtual Credit Cards
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Take full control over your spending and financial security with
              our advanced card management features. Say goodbye to unexpected
              charges with the ability to set personalized limits.
            </p>
            <div className="mt-8 space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {benefit.icon}
                  <span className="text-gray-700">{benefit.title}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800">
                See details
                <MdArrowForward className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Process Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900">
              New payment with swift, flexible, and reliable
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Suggests enhancing your products by integrating payment solutions
              that are fast, adaptable to various needs, and dependable in terms
              of security and performance.
            </p>
            <div className="mt-8">
              <button className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800">
                See details
                <MdArrowForward className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden ">
            <div className="relative aspect-[4/3]">
              <img
                src="/images/wallets.jpg"
                alt="Virtual Card Preview"
                className="h-full w-screen rounded-2xl  object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transfer Process Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden">
            <div className="relative aspect-[4/3]">
              <img
                src="/images/wallets.jpg"
                alt="Virtual Card Preview"
                className="h-full w-screen rounded-2xl  object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Transfer money with swift, flexible, and reliable
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Experience seamless money transfers with our advanced platform.
              Send and receive funds instantly, securely, and with complete
              transparency.
            </p>
            <div className="mt-8">
              <button className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800">
                See details
                <MdArrowForward className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
