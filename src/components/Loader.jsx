// Loader.js
const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="loader">
        <svg
          className="animate-spin h-14 w-14 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Loader;
