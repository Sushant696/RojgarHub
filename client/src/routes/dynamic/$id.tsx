import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dynamic/$id")({
  component: RouteComponent,
  //loader: async({ params })=> await getStuffById(params.id)
});

function RouteComponent() {
  const { id } = Route.useParams();
  // got the loader data
  // const data = Route.useLoaderData();
  // console.log(data);

  return <div>Hello /dynamic/{id}</div>;
}
