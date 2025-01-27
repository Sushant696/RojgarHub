import showNotification from "./toastify";

export default function DisplayErrorToast(error: any) {
  const errorMessage = error.response?.data?.message || "Something went wrong";
  showNotification("error", errorMessage || "Sometime went wrong.");
}
