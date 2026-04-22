import { SignUp } from "@/components/auth/signup";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  // const { data } = useSuspenseQuery(convexQuery(api.tasks.get, {}))

  return (
    <div>
      <SignUp />
      {/* {data.map(({ _id, text }) => ( */}
      {/*   <div key={_id}>{text}</div> */}
      {/* ))} */}
    </div>
  );
}
