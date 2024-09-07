import PropTypes from "prop-types";
const StartScreen = ({ onStart }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-5xl font-bold mb-8">Welcome to Movie Search</h1>
      <button
        onClick={onStart}
        className="bg-white text-gray-900 px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-gray-100 transition-all duration-300"
      >
        Start Searching
      </button>
    </div>
  );
};

export default StartScreen;
StartScreen.propTypes = {
  onStart: PropTypes.func.isRequired,
};
