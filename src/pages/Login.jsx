import AuthLayout from "./layouts/AuthLayout";
import { useForm } from "react-hook-form";

export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  function handleLogin(data) {
    console.log(data, "---");
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
            className="h-12 text-center block w-full rounded-lg bg-primary text-white font-bold "
          >
            GİRİŞ
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
