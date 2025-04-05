import { useState, useCallback } from "react";

const useToast = () => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showToast = useCallback((message, severity = "success") => {
    console.log(
      "Showing toast with message:",
      message,
      "and severity:",
      severity
    );
    setToast({ open: true, message, severity });
  }, []);

  const handleClose = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast((prevToast) => ({ ...prevToast, open: false }));
  }, []);

  return {
    toast,
    showToast,
    handleClose,
  };
};

export default useToast;
