import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCalendarAlt, FaStar } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import Loader from "../components/Loader";

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [castDetails, setCastDetails] = useState([]);
  const [crewDetails, setCrewDetails] = useState({
    directors: [],
    writers: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // OMDB API fetch
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${id}&apikey=${
            import.meta.env.VITE_APP_OMDB_API_KEY
          }`
        );
        if (response.data.Response === "True") {
          setMovieDetails(response.data);
          // console.log(response.data);
        } else {
          setError(response.data.Error);
        }
      } catch (err) {
        setError("Unable to fetch movie details.", err);
      }
      setLoading(false);
    };

    fetchMovieDetails();
  }, [id]);

  // TMDB API fetch for actor, director, and writer images
  useEffect(() => {
    if (movieDetails) {
      const fetchCastAndCrewDetails = async () => {
        const tmdbResponse = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${
            import.meta.env.VITE_APP_TMDB_API_KEY
          }&query=${movieDetails.Title}`
        );

        if (tmdbResponse.data.results.length > 0) {
          const tmdbMovieId = tmdbResponse.data.results[0].id;

          // Fetch credits (actors, directors, writers, etc.)
          const creditsResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${tmdbMovieId}/credits?api_key=${
              import.meta.env.VITE_APP_TMDB_API_KEY
            }`
          );

          // Extract cast and crew data
          const castData = creditsResponse.data.cast.slice(0, 5); // Top 5 actors
          const crewData = creditsResponse.data.crew;

          // Filter for directors and writers
          const directors = crewData.filter(
            (member) => member.job === "Director"
          );
          const writers = crewData.filter(
            (member) =>
              member.job === "Writer" || member.department === "Writing"
          );

          setCastDetails(castData);
          setCrewDetails({ directors, writers });
        }
      };

      fetchCastAndCrewDetails();
    }
  }, [movieDetails]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8 min-h-screen bg-gray-900 px-24">
      {movieDetails && (
        <div className="flex justify-center gap-12">
          <figure className="bg-gray-800 p-3 rounded-lg shadow-lg">
            <img
              src={movieDetails.Poster}
              alt={movieDetails.Title}
              className="w-[35rem] h-full object-cover rounded-lg"
            />
          </figure>
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-bold mb-2 text-white">
              {movieDetails.Title}
            </h1>
            <p className="flex gap-4 items-center">
              <span className="text-white border-2 rounded-sm text-xs border-white p-1 font-semibold">
                {movieDetails.Rated}
              </span>
              <span className="bg-white text-gray-900 text-xs rounded-sm border-2 border-white py-1 px-3 font-semibold">
                HD
              </span>
              <span className=" text-gray-400 ">{movieDetails.Genre}</span>
            </p>
            <p className="flex items-center text-[15px] font-medium mt-2 gap-4 text-gray-300">
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-yellow-400 " />
                {movieDetails.Released}
              </span>
              <span className="flex items-center gap-1">
                <IoTime className="text-yellow-400 " />
                {movieDetails.Runtime}
              </span>
              <span className="flex items-center gap-1">
                <FaStar className="text-yellow-400 " />
                {movieDetails.imdbRating}/10
              </span>
            </p>
            <p className="text-gray-400 text-lg">{movieDetails.Plot}</p>
            <p className="text-white font-medium text-lg">
              Director :{" "}
              <span className="text-gray-300">{movieDetails.Director}</span>
            </p>
            <p className="text-white font-medium text-lg">
              Cast :{" "}
              <span className="text-gray-300">{movieDetails.Actors}</span>
            </p>
            <p className="text-white font-medium text-lg">
              Box Office :{" "}
              <span className="text-gray-300">{movieDetails.BoxOffice}</span>
            </p>
            <p className="text-white font-medium text-lg">
              Language :{" "}
              <span className="text-gray-300">{movieDetails.Language}</span>
            </p>
            <p className="text-white font-medium text-lg">
              Writer :{" "}
              <span className="text-gray-300">{movieDetails.Writer}</span>
            </p>
          </div>
        </div>
      )}

      {/* Cast Section */}
      {castDetails.length > 0 && (
        <div className="mt-8 bg-gray-800 px-6 py-5 rounded-lg shadow-lg">
          <h2 className="text-2xl text-white mb-4">Cast</h2>
          <div className="flex gap-4">
            {castDetails.map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="rounded-full w-24 h-24 object-cover"
                />
                <p className="text-white mt-2">{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Director Section */}
      {crewDetails.directors.length > 0 && (
        <div className="mt-8 bg-gray-800 px-6 py-5 rounded-lg shadow-lg">
          <h2 className="text-2xl text-white mb-4">Director</h2>
          <div className="flex gap-4">
            {crewDetails.directors.map((director) => (
              <div key={director.id} className="text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                  alt={director.name}
                  className="rounded-full w-24 h-24 object-cover"
                />
                <p className="text-white mt-2">{director.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Writer Section */}
      {crewDetails.writers.length > 0 && (
        <div className="mt-8 bg-gray-800 px-6 py-5 rounded-lg shadow-lg">
          <h2 className="text-2xl text-white mb-4">Writers</h2>
          <div className="flex gap-4">
            {crewDetails.writers.map((writer) => (
              <div key={writer.id} className="text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w200${writer.profile_path}`}
                  alt={writer.name}
                  className="rounded-full w-24 h-24 object-cover"
                />
                <p className="text-white mt-2">{writer.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
