import useAuthStore from "@/stores/authStore";
import ContactForm from "@/components/employer/contactForm";
import ProfileForm from "@/components/employer/profileForm";

const Settings = () => {
  const { authenticatedUser } = useAuthStore();
  return (
    <div className=" mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-blue-50/50 to-white min-h-screen">
      <div className="space-y-8">
        <ProfileForm employer={authenticatedUser} />
        <ContactForm employer={authenticatedUser} />
      </div>
    </div>
  );
};

export default Settings;
