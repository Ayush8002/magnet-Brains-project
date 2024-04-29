import { NavLink } from "react-router-dom";
import ErrorImage from "../../assets/images/ErrorPage.jpg";

const ErrorPage = () => {
  return (
    <div className="sm:h-[80vh] h-[60vh] flex flex-col justify-center items-center">
      <img src={ErrorImage} alt="404" className="h-3/4" />
      <NavLink to="/">
        <button className="text-white hover:bg-purple-800 bg-black w-52 p-4 text-sm rounded-md">
          Go To Home
        </button>
      </NavLink>
    </div>
  );
};

export default ErrorPage;
