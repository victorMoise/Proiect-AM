import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useToast from "../../../hooks/useToast";
import { axiosInstance } from "../../../utils/axios";
import { endpoints, fit } from "../../../utils/endpoints";
import Toast from "../../../common/components/Toast";
import AddressDetailsComponent from "./AddressDetailsComponent";

const AddressDetailsContainer = () => {
  const { t } = useTranslation("common");
  const { toast, showToast, handleClose } = useToast();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [address, setAddress] = useState({
    city: {
      id: null,
      code: "",
      name: "",
    },
    country: {
      id: null,
      code: "",
      name: "",
    },
    street: "",
    details: "",
  });
  const [initialState, setInitialState] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const address = await axiosInstance.get(endpoints.user.address);
        setAddress(address.data);
        setInitialState(address.data);

        const countries = await axiosInstance.get(endpoints.user.countries);
        setCountries(countries.data);
        
        let cities = []
        if (address?.data?.country?.id) 
          cities = await axiosInstance.get(
            fit(endpoints.user.cities, { countryId: address?.data?.country?.id })
        );
        setCities(cities.data);
      } catch (err) {
        showToast(err.message || t("MyAccount.Error.FetchingData"), "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [showToast, t]);

  const handleAddressChange = useCallback((e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleCountryChange = async (_event, newValue) => {
    if (!newValue) {
      setCities([]);
      setAddress((prevState) => ({
        ...prevState,
        country: null,
        city: null,
      }));
      return;
    }

    const citiesUrl = fit(endpoints.user.cities, { countryId: newValue.id });
    const citiesResponse = await axiosInstance.get(citiesUrl);
    setCities(citiesResponse.data);

    setAddress((prevState) => ({
      ...prevState,
      country: newValue,
      city: null,
    }));
  };

  const handleCityChange = (_event, newValue) => {
    setAddress((prevState) => ({
      ...prevState,
      city: newValue,
    }));
  };

  const handleSave = useCallback(async () => {
    try {
      if (!address?.city?.id || !address?.country?.id) {
        showToast(t("MyAccount.Error.CityOrCountryMissing"), "error");
        return;
      }

      const dtoAddress = {
        cityId: address?.city?.id,
        countryId: address?.country?.id,
        street: address.street,
        details: address.details,
      }

      await axiosInstance.put(endpoints.user.address, dtoAddress);
      showToast(t("MyAccount.DetailsUpdated"), "success");
      setInitialState(address);
    } catch (err) {
      showToast(err.message || t("MyAccount.Error.SavingDetails"), "error");
    }
  }, [address, showToast, t]);

  const handleReset = useCallback(() => {
    setAddress(initialState);
  }, [initialState]);

  return (
    <>
      <AddressDetailsComponent
        loading={loading}
        address={address}
        cities={cities}
        countries={countries}
        onAddressChange={handleAddressChange}
        onCountryChange={handleCountryChange}
        onCityChange={handleCityChange}
        onSave={handleSave}
        onReset={handleReset}
      />
      <Toast toast={toast} handleClose={handleClose} />
    </>
  );
};

export default AddressDetailsContainer;
