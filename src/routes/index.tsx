import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <button type="button" className="text-blue-200">
        Click
      </button>
    </div>
  );
}
