/* eslint-disable react/prop-types */

const CityList = ({ cities, onCityClick, onRemoveCity }) => {
  return (
    <div className="flex-1 mx-auto  mt-8">
      <h2 className="text-2xl font-bold mb-4">City List</h2>
      <ul>
        {cities.map((city) => (
          <li
            key={city.id}

            className="flex items-center justify-between border-b py-2 px-4 hover:bg-gray-100"
          >
            <span
              onClick={() => onCityClick(city.name)}
              className="cursor-pointer text-blue-500"
            >
              {city.name}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => onRemoveCity(city.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      {cities.length===0 && <p className='text-center flex justify-center items-center'>No cities found</p>}
    </div>
  );
};

export default CityList;
