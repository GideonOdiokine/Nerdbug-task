import axios from "axios";
import CityList from "../components/CityList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import FavoriteList from '../components/FavoritiesList';

// const API_KEY = "7d4034c6cb7edd0c6b8d6d7c337c4994"; // Replace with your actual API key
const API__KEY = "0d63c234f45849cab44b1efb54c1afd2"; // Replace with your actual API key


const Home = () => {
  const [cities, setCities] = useState([
    { id: 1, name: "New York" },
    { id: 2, name: "London" },
    { id: 3, name: "Nigeria" },
    { id: 4, name: "Germany" },
    { id: 5, name: "Canada" },
    { id: 6, name: "Boston" },
    { id: 7, name: "London" },
    { id: 8, name: "Paris" },
    { id: 9, name: "Spain" },
    { id: 10, name: "Japan" },
    { id: 11, name: "Tokyo " },
    { id: 12, name: "Singapore  " },
    { id: 13, name: "Dubai  " },
  ]);
  const [favorites, setFavorites] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
        const savedFavorites =
          JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
    // Fetch data for the 15 largest cities
    const fetchCities = async () => {
      try {
        if (userLocation) {
          // Use reverse geocoding to get city name based on latitude and longitude
          const reverseGeocodingResponse = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?key=${API__KEY}&q=${userLocation.latitude}+${userLocation.longitude}`
          );

          const country =
            reverseGeocodingResponse.data.results[0].components.country;
          navigate(`/details/${country}`);
        }
      } catch (error) {
        console.error("Error fetching city data", error);
      }
    };

    fetchCities();
  }, [userLocation, navigate]);

  const handleCityClick = (cityId) => {
    // Navigate to city details page
    navigate(`/details/${cityId}`);
  };

  const handleRemoveCity = (cityId) => {
    // Remove city from the list
    const updatedCities = cities.filter((city) => city.id !== cityId);
    setCities(updatedCities);
  };


  const askForLocationPermission = () => {
    // Ask for permission to access user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // eslint-disable-next-line no-unused-vars
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Error getting user location:", error.message);
      }
    );
  };
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  useEffect(() => {
    // Ask for location permission when the component mounts
    askForLocationPermission();
  }, []);

  // Filter cities based on search term
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort favorites alphabetically
  const sortedFavorites = [...favorites].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
const handleRemoveFavorite = (cityId) => {
  // Remove city from favorites
  const updatedFavorites = favorites.filter((city) => city.id !== cityId);
  setFavorites(updatedFavorites);

  // Update localStorage with the new list of favorites
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};


  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="md:flex w-full px-6 container space-x-6 mx-auto ">
        <CityList
          cities={filteredCities}
          onCityClick={handleCityClick}
          onRemoveCity={handleRemoveCity}
        />
        <FavoriteList
          favorites={sortedFavorites}
          onRemoveFavorite={handleRemoveFavorite}
        />
      </div>
    </>
  );
};

export default Home;
