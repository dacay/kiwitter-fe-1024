import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import { useForm } from "react-hook-form";

import { signUp } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [inProgress, setInProgress] = useState(false);

  const { login } = useContext(UserContext);

  const history = useHistory();

  async function handleSignup({ name, email, nickname, password }) {

    setInProgress(true);

    try {

      const token = await signUp(name, email, nickname, password);

      login(token);

      toast.success("Kayıt başarılı!");

      setTimeout(() => history.push("/"), 1000);

    } catch(err) {

      console.error(err);

      toast.error("Sign up failed.");

    } finally {

      setInProgress(false);
    }
  }

  return (
    <AuthLayout>
      <h1 className="text-3xl text-center font-semibold tracking-tighter text-primary">
        Hoş Geldin!
      </h1>
      <form onSubmit={handleSubmit(handleSignup)}>
        <div className="pt-4">
          <div className="flex justify-between gap-2 items-baseline pb-1">
            <label htmlFor="name">İsim Soyisim</label>
            <span className="text-sm font-medium text-red-600">
              {errors.name && errors.name.message.toString()}
            </span>
          </div>
          <input
            type="text"
            className="w-full h-10 px-2 border rounded-md border-gray-300"
            {...register("name", { required: "Bu alan zorunlu" })}
          />
        </div>

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
            <label htmlFor="nickname">Email</label>
            <span className="text-sm font-medium text-red-600">
              {errors.email && errors.email.message.toString()}
            </span>
          </div>
          <input
            type="email"
            className="w-full h-10 px-2 border rounded-md border-gray-300"
            {...register("email", {
              required: "Bu alan zorunlu",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Geçerli bir email adresi girin",
              },
            })}
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
            className={`h-12 text-center block w-full rounded-lg text-white font-bold ${inProgress ? "bg-gray-700" : "bg-primary"}`}
          >
            {inProgress ? "KAYIT OLUYOR..." : "KAYIT OL"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
