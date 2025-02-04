import Loading from "@/components/isLoading";
import { useVerify } from "../hooks/auth";

const AuthProvider = () => {
  const { isLoading } = useVerify();

  if (isLoading) {
    return (
      <div className="">
        <Loading />
      </div>
    );
  }

  return null;
};

export default AuthProvider;
