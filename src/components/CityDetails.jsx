import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const API_KEY = "a228619ed0256db40e9393366f42aa47";


const CityDetails = () => {
  const { id } = useParams();
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [cityDetails, setCityDetails] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate()



  useEffect(() => {


    const fetchData = async () => {
      try {
        // Simulate fetching data
        const response = await fetch(
          `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${id}`
        );
        const data = await response.json();
        setCityDetails(data);
        setNotes(data.notes || []); // Assuming cityDetails contains a notes array
      } catch (error) {
        console.error("Error fetching city details", error);
      }
    };

    fetchData();
  }, []);

useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);

  const handleAddFavorite = (cityName) => {
    // Update favorites array without modifying the existing one
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, { id, name: cityName }];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };


  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSaveNote = () => {
    if (newNote.trim() === "") return;

    if (isEditing && editIndex !== null) {
      // Editing an existing note
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = newNote;
      setNotes(updatedNotes);
    } else {
      // Adding a new note
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }

    setNewNote("");
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleEditNote = (index) => {
    setNewNote(notes[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleRemoveNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  if (!cityDetails) {
    return <p>Loading...</p>; // You might want to add a loading indicator
  }

  console.log(cityDetails)

  return (
    <div className="max-w-lg mx-auto mt-8 bg-black text-white px-10 py-6">
      <button onClick={() => navigate("/")}>Back to home</button>
      <h2 className="text-2xl font-bold mb-4 flex space-x-2">
        {cityDetails?.location?.name}
      </h2>
      <img
        src={cityDetails?.current?.weather_icons}
        alt="icon"
        className="w-6 h-6"
        width={200}
        height={200}
      />
      <p>Temperature: {cityDetails?.current?.temperature}</p>
      <p>Description: {cityDetails?.current?.weather_descriptions}</p>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => handleAddFavorite(cityDetails?.location?.name)}
          className="bg-blue-500 w-full text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Add to Favorites
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Notes</h3>
        <ul>
          {notes.map((note, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b py-2 px-4"
            >
              <span>{note}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditNote(index)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveNote(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        {isEditing && (
          <div className="mt-4">
            <textarea
              value={newNote}
              onChange={handleNoteChange}
              className="w-full border p-2 rounded-md text-black"
            />
            <div className="mt-2 flex space-x-2">
              <button
                onClick={handleSaveNote}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
              >
                Save Note
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray active:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Add Note
          </button>
        )}
      </div>
    </div>
  );
};

export default CityDetails;
