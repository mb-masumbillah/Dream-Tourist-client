import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

const Register = () => {
  const { createSignUp } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    const { name, email, photo, password } = data;
    console.log(name, photo, email, password);


    if(password.length < 6){
        console.log('password least 6 chraacter or longer')
        return toast.error("password least 6 chraacter or longer")
    }
    else if(!/[A-Z]/.test(password)){
        console.log('your password should have at least one upper case characters [[A-Z]]')
        return toast.error("your password should have at least one upper case characters [[A-Z]]")
    }
    else if(!/[a-z]/.test(password)){
        console.log('your password should have at least one upper case characters [[a-z]]')
        return toast.error("your password should have at least one upper case characters [[a-z]]")
    }


    createSignUp(email, password)
      .then((result) => {
        console.log(result.user);
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        });
        return toast.success("your register successfull")
      })
      .catch((error) => {
        console.error(error);
        return toast.error(error.message)
      });
  };
  return (
    <div className="h-auto py-10 flex items-center justify-center">
      <div className="w-[550px] border-2 border-[#6d4416] px-10 py-8">
        <h1 className="text-center text-4xl font-bold text-[#6d4416]">
          Register
        </h1>
        <form onSubmit={handleSubmit(handleRegister)} className="mt-8">
          <label className="block">
            <span className="text-[#6d4416] font-medium text-xl py-2 block">
              {" "}
              Name*
            </span>
            <input
              type="text"
              placeholder="Please Enter Your Name"
              className="w-full border-2 border-[#6d4416] rounded-md px-4 py-3 outline-none"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-700">This field is required</span>
            )}
          </label>
          <label className="block">
            <span className="text-[#6d4416] font-medium text-xl py-2 block">
              {" "}
              Email*
            </span>
            <input
              type="email"
              placeholder="Please Enter Your Email"
              className="w-full border-2 border-[#6d4416] rounded-md px-4 py-3 outline-none"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-700">This field is required</span>
            )}
          </label>

          <label className="block">
            <span className="text-[#6d4416] font-medium text-xl py-2 block">
              {" "}
              Photo URL
            </span>
            <input
              type="text"
              placeholder="Please Enter Your Photo URL"
              className="w-full border-2 border-[#6d4416] rounded-md px-4 py-3 outline-none"
              {...register("photo")}
            />
          </label>

          <label className="block">
            <span className="text-[#6d4416] font-medium text-xl py-2 block">
              {" "}
              Password*
            </span>
            <input
              type="password"
              placeholder="Please Enter Your Password"
              className="w-full border-2 border-[#6d4416] rounded-md px-4 py-3 outline-none"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-700">This field is required</span>
            )}
          </label>

          <label className="mt-5 block">
            <input
              type="submit"
              value="Register"
              className="w-full bg-[#6d4416] btn hover:bg-[#6d4416] text-white text-xl font-semibold outline-none"
            />
          </label>
        </form>
        <div className="mt-2">
          <p className="text-center">
            New to this website ? Please ?
            <Link to="/login" className="underline font-bold text-blue-400">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
