export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
  user: {
    details: "/user",
    address: "/user/address",
    countries: "/user/countries",
    cities: "/user/cities?countryId={countryId}",
  },
  songs: {
    publicList: "/songs/public/list?onlyFavorites={onlyFavorites}&onlyOwned={onlyOwned}",
    generic: "/songs",
    artists: "/songs/artists",
    genres: "/songs/genres",
    favorite: "/songs/favorite?songId={songId}",
    unfavorite: "/songs/unfavorite?songId={songId}",
    userUploads: "/songs/user/uploads",
  },
};

export const fit = (url, params) => {
  return url.replace(/{(\w+)}/g, (_, key) => {
    const value = params[key];
    return value === undefined || value === null ? "" : String(value);
  });
};