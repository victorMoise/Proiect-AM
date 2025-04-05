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
};

export const fit = (url, params) => {
  return url.replace(/{(\w+)}/g, (_, key) => params[key] || "");
};