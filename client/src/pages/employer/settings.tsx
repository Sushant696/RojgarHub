import ContactForm from "@/components/employer/contactForm";
import ProfileForm from "@/components/employer/profileForm";
import SocialMediaform from "@/components/employer/socialMediaForm";

function Settings() {
  return (
    <div className="p-4">
      <div>
        <h1 className="emphasized-text">My Profile</h1>
      </div>

      <div className="flex gap-10">
        <div className="bg-white flex-[0.7] my-6 rounded-xl p-6 shadow-sm">
          <ProfileForm />
        </div>
        <div className="bg-white flex-[0.3] my-6 rounded-xl p-6 shadow-sm h-fit">
          <SocialMediaform />
        </div>
      </div>

      <ContactForm />
    </div>
  );
}

export default Settings;
