import React, { useCallback, useEffect, useState } from "react";
import useToast from "../../../hooks/useToast";
import { axiosInstance } from "../../../utils/axios";
import { endpoints } from "../../../utils/endpoints";
import { useTranslation } from "react-i18next";
import UserDetailsComponent from "./UserDetailsComponent";
import Toast from "../../../common/components/Toast";

const UserDetailsContainer = () => {
  const { toast, showToast, handleClose } = useToast();
  const { t } = useTranslation("common");
  const [user, setUser] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [initialState, setInitialState] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const details = await axiosInstance.get(endpoints.user.details);
        const { addressData, ...userData } = details.data;

        setUser(userData);
        setInitialState(userData);
      } catch (err) {
        showToast(err.message || t("MyAccount.Error.FetchingData"), "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [showToast, t]);

  const handleUserChange = useCallback((e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSave = useCallback(async () => {
    try {
      if (!user.username?.length || !user.email?.length) {
        showToast(t("MyAccount.Error.UsernameOrEmailMissing"), "error");
        return;
      }

      const useDro = {...user, age: user.age || null}

      await axiosInstance.put(endpoints.user.details, useDro);
      showToast(t("MyAccount.DetailsUpdated"), "success");
      setInitialState(user);
    } catch (err) {
      showToast(err.message || t("MyAccount.Error.SavingDetails"), "error");
    }
  }, [showToast, t, user]);

  const handleReset = useCallback(() => {
    setUser(initialState);
  }, [initialState]);

  return (
    <>
      <UserDetailsComponent
        user={user}
        onUserChange={handleUserChange}
        loading={loading}
        onSave={handleSave}
        onReset={handleReset}
      />
      <Toast toast={toast} handleClose={handleClose} />
    </>
  );
};

export default UserDetailsContainer;
