import { useVerify } from "../hooks/auth";

const AuthProvider = () => {
  const { isLoading } = useVerify();

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center mx-auto">
        loading...
      </div>
    );
  }

  return null;
};

export default AuthProvider;
