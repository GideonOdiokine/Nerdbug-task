/* eslint-disable react/prop-types */

const FavoriteList = ({ favorites, onRemoveFavorite }) => {
  return (
    <div className="flex-1 mx-auto border px-10 py-3 mt-8">
      <h2>Favorite Cities</h2>
      <ul>
        {favorites.map((favorite) => (
          <li
            key={favorite.id}
            className="flex items-center justify-between border-b py-2 px-4"
          >
            <span>{favorite.name}</span>
            <button
              onClick={() => onRemoveFavorite(favorite.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      {favorites.length === 0 && <p className='text-center flex justify-center items-center'>No favorite found</p>}
    </div>
  );
};

export default FavoriteList;
