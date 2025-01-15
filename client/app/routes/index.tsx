import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getAPIData } from "../utils/api";

export const loader = async () => {
  const data = await getAPIData();
  return json(data);
};

export default function Index() {
  const data = useLoaderData();

  return (
    <div>
      <h1>Welcome to the Remix App</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
