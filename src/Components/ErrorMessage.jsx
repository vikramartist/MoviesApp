/* eslint-disable react/prop-types */
const ErrorMessage = ({ message }) => {
  return (
    <p className="h-screen w-full text-center flex justify-center items-center">
      🛑 {message}
    </p>
  );
};

export default ErrorMessage;
