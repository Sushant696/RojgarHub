import Loading from "@/components/isLoading";
import { useGetEmployerApplications } from "@/hooks/employer";

function ApplicationManagement() {
  const { data, isLoading } = useGetEmployerApplications();
  console.log(data, "ready to use data is here");

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Application Management</h1>
    </div>
  );
}

export default ApplicationManagement;
