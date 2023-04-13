/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../assets/styles/2fa.css";
import Button from "../components/Button";
import FaHeader from "../utils/FaHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AxiosClient } from "../utils/AxiosClient";

type FormValues = {
  sentCode: string;
};
type APIResponses = {
  status: number;
  message?: string;
  verificationStatus?: string | boolean;
  codeValidity?: string | boolean;
};

function VerifyCode() {
  const location = useLocation();
  const navigate = useNavigate();
  const phone_number = location.state?.phone_number || null;
  document.title = "Verify OTP";
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(0);
  const [error, setError] = useState("");
  const verifyCode = (phone: string, otp: number | string) => {
    toast.loading("Sending your request...");
    let url: string;
    if (phone == "" || phone == null || phone == undefined) {
      url = `/verify/${otp}`;
    } else {
      url = `/verify/${phone}/${otp}`;
    }
    setLoading(true);
    AxiosClient.get<APIResponses>(url)
      .then((response) => {
        toast.remove();
        setResponse(response.data.status);
        if (response.data.codeValidity == true) {
          toast.success("You're verified!", { duration: 4000 });
          setTimeout(() => {
            navigate("/seller-home");
          }, 3000);
        } else {
          toast.error("Invalid code!");
        }
      })
      .catch((error) => {
        toast.remove();
        if (isAxiosError(error)) {
          setError(`Axios error: ${error.message}`);
          toast.error(error.message);
        } else {
          setError(`Something went wrong: `);
        }
      })
      .finally(() => setLoading(false));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) =>
    verifyCode(phone_number as string, data.sentCode)
  );
  const checkLength = { value: 6, message: "Code Should be 6 digits" };
  return (
    <div className="setupContainer">
      <FaHeader />
      <div className="body-text">
        <p>Enter 6-digit code sent on your phone</p>
      </div>
      <form onSubmit={onSubmit}>
        {phone_number && phone_number}
        <input
          style={{
            borderColor: errors.sentCode?.type == "required" ? "red" : "",
            textAlign: "center",
          }}
          type="number"
          placeholder="XXXXXX"
          {...register("sentCode", {
            required: true,
            maxLength: checkLength,
            minLength: checkLength,
          })}
          autoComplete="off"
        />
        {response ? "" : ""}
        {error && <p className="error">{error}</p>}
        {errors?.sentCode && <p className="error">{errors.sentCode.message}</p>}
        <Button text="Verify" disabled={loading} type="submit" />
      </form>
      <Toaster />
    </div>
  );
}

export default VerifyCode;
