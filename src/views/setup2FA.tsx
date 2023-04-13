/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../assets/styles/2fa.css";
import Button from "../components/Button";
import FaHeader from "../utils/FaHeader";
import { isAxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AxiosClient } from "../utils/AxiosClient";

type FormValues = {
  phoneNumber: string;
};
type APIResponses = {
  status: number;
  message?: string;
  codeSentTo?: string;
  verificationStatus?: string | boolean;
};

function Setup2FA() {
  const [phone_number, setPhone] = useState("");
  document.title = "Setup two-step verification";
  const navigate = useNavigate();
  const [isResponseArrived, setResponseStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const sendcode = (phone: string) => {
    setLoading(true);
    toast.loading("Sending your request...");
    AxiosClient.get<APIResponses>(`/sendcode/${phone}`)
      .then((response) => {
        if (response.data.status == 200) {
          setPhone(response.data.codeSentTo as string);
          setResponseStatus(true);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          toast.error(`Axios error: ${error.message}`);
        } else {
          toast.error(`Something went wrong`);
        }
      })
      .finally(() => setLoading(false));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  let phone: string;
  const minimum = {
    value: 13,
    message: "Phone number should be at least 13 characters",
  };
  const maximum = {
    value: 15,
    message: "Phone number should be less than 15 characters",
  };
  const onSubmit = handleSubmit((data) => {
    phone = data.phoneNumber;
    sendcode(phone);
  });
  useEffect(() => {
    if (isResponseArrived) {
      toast.remove();
      toast.success("Verification Sent!", { duration: 3000 });
      setTimeout(() => {
        navigate("/verify-code", { state: { phone_number } });
      }, 2000);
    }
  }, [isResponseArrived]);

  return (
    <div className="setupContainer">
      <FaHeader />
      <div className="body-text">
        <p>
          As a seller you need to enable 2-step authentication for maximum
          security{" "}
        </p>
        <h3>Set up two-factor authentication</h3>
      </div>
      <form onSubmit={onSubmit}>
        <input
          style={{
            borderColor: errors.phoneNumber?.type == "required" ? "red" : "",
          }}
          type="tel"
          placeholder="+250788888888"
          pattern="[0-9,+]+"
          {...register("phoneNumber", {
            required: true,
            minLength: minimum,
            maxLength: maximum,
          })}
          autoComplete="off"
        />
        {errors?.phoneNumber && (
          <p className="error">{errors.phoneNumber.message}</p>
        )}
        <Button text="Get Code" disabled={loading} type="submit" />
      </form>
      <Toaster />
    </div>
  );
}

export default Setup2FA;
