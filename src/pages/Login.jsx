import { useContext, useState } from "react";

import AuthLayout from "./layouts/AuthLayout";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { toast } from 'react-toastify';

import { UserContext } from "../contexts/UserContext";
import { login } from "../utils/api";

export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const history = useHistory();

  const [loggingIn, setLoggingIn] = useState(false);
 
  const { login:loginContext } = useContext(UserContext);

  const handleLogin = async ({ nickname, password }) => {

    setLoggingIn(true);

    try {

      const token = await login(nickname, password);

      console.debug("Login completed.");

      loginContext(token);

      toast.success("Successfully logged in!");

      setTimeout(() => history.push("/"), 1000);

    } catch(err) {

      console.error("Failed to log in.", err);

      toast.error("Failed to log in.");

    } finally {

      setLoggingIn(false);
    }
  }

  return (
    <AuthLayout>
      <h1 className="text-3xl text-center font-semibold tracking-tighter text-primary">
        Hoş Geldin!
      </h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="pt-4">
          <div className="flex justify-between gap-2 items-baseline pb-1">
            <label htmlFor="nickname ">Kullanıcı adı</label>
            <span className="text-sm font-medium text-red-600">
              {errors.nickname && errors.nickname.message.toString()}
            </span>
          </div>
          <input
            type="text"
            className="w-full h-10 px-2 border rounded-md border-gray-300"
            {...register("nickname", { required: "Bu alan zorunlu" })}
          />
        </div>

        <div className="pt-4">
          <div className="flex justify-between gap-2 items-baseline pb-1">
            <label htmlFor="password">Şifre</label>
            <span className="text-sm font-medium text-red-600">
              {errors.password && errors.password.message.toString()}
            </span>
          </div>
          <input
            type="password"
            className="w-full h-10 px-2 border rounded-md border-gray-300"
            {...register("password", { required: "Bu alan zorunlu" })}
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className={`h-12 text-center block w-full rounded-lg text-white font-bold ${loggingIn ? "bg-gray-700" : "bg-primary"}`}
          >
            {loggingIn ? "GİRİLİYOR..." : "GİRİŞ"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
