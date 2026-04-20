import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">kre8</h1>
        <p className="mb-8 text-xl text-gray-600">
          A modern, production-ready full-stack boilerplate. Batteries included,
          opinions included, BS excluded.
        </p>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <span className="text-xl text-blue-600">⚡</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Blazing Fast
              </h3>
            </div>
            <p className="text-gray-600">
              Powered by Bun for lightning-fast runtime, package management, and
              testing.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <span className="text-xl text-green-600">🔥</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Modern Stack
              </h3>
            </div>
            <p className="text-gray-600">
              TanStack Start, React 19, Convex, Better Auth, Tailwind CSS, and
              shadcn/ui.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <span className="text-xl text-purple-600">🛠️</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Production Ready
              </h3>
            </div>
            <p className="text-gray-600">
              Docker containerization, OXC linting, and deployment-optimized
              setup.
            </p>
          </div>
        </div>

        <div className="space-y-6 space-x-6">
          <a
            href="https://github.com/zougari47/kre8"
            className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
          >
            View on GitHub
          </a>

          <a
            href="#getting-started"
            className="inline-block rounded-lg border border-gray-300 px-8 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
          >
            Getting Started
          </a>
        </div>
      </div>
    </div>
  );
}
