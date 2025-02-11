import Loading from "@/components/isLoading";
import { useGetEmployerCandidates } from "@/hooks/employer";

function Candidates() {
  const { data, isLoading, isError } = useGetEmployerCandidates();
  console.log(data, "logged data");
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h1>Candidates not found</h1>;
  }
  return (
    <div>
      Name: {data.candidate[0]?.fullName}
      <h1>id: {data.candidate[0]?.id}</h1>
    </div>
  );
}

export default Candidates;
