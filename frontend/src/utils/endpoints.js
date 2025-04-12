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
    publicList: "/songs/public/list",
    upload: "/songs",
    artists: "/songs/artists",
    genres: "/songs/genres",
    favorite: "/songs/favorite?songId={songId}",
  },
};

export const fit = (url, params) => {
  return url.replace(/{(\w+)}/g, (_, key) => params[key] || "");
};
