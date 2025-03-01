import useAuthStore from "../stores/authStore";
import CandidateNavbar from "./candidate/candidateNavbar";
import PublicNavbar from "./PublicNavbar";

function Navbar() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <PublicNavbar />;
  }

  if (user?.role === "CANDIDATE") {
    return <CandidateNavbar />;
  }

  return null;
}

export default Navbar;
