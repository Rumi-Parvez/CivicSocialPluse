import Link from "next/link";
import { MdHome } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="min-h-[100vh] flex items-center justify-center px-5">
      <div className="text-center max-w-xl">
        

        <h1 className="text-7xl md:text-9xl font-oswald font-bold">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-oswald font-bold mt-4">
          This page does not exist.
        </h2>

        <p className="text-gray-400 font-light mt-3 max-w-md mx-auto">
          {`The page or workout you are looking for does not exist. Let's
          get you back to your training.`}
        </p>

        <div className="flex justify-center items-center gap-4 mt-8">
          

          <Link
            href="/"
            className="bg-lime-400 text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-lime-300 transition"
          >
            <MdHome className="text-xl" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;