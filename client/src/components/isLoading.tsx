import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center mx-auto">
      <div className="w-44 h-44">
        <DotLottieReact
          src="https://lottie.host/cc914034-4bf4-4e27-885d-5af9b6ec5b8f/82mZ53TkY4.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default Loading;
