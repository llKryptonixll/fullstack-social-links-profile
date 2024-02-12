import {
  Card,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const Register = () => {

  useAuth("/social-links");
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  async function handleRegister() {
    const inputValues = {
      fullName: getValues("fullName"),
      cityCountry: getValues("cityCountry"),
      profession: getValues("profession")
    };

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, getValues("email"), getValues("password"));
      const user = userCredential.user;
      const userCollectionRef = collection(db, `users/${user.uid}/data`);
      await addDoc(userCollectionRef, inputValues);

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Registration error:", errorCode, errorMessage);
      alert(errorMessage);
    }
  }

  const inputStyles = "rounded-md border-[1px] border-white bg-transparent h-[45px] pl-4 placeholder:text-white text-white focus:outline-none focus:border-green focus:border-2";

  return (
    <Card className="max-w-96 w-full bg-dark_grey">
      <CardHeader
        className="mb-4 grid h-28 place-items-center bg-grey"
      >
        <Typography className="text-4xl" variant="h1" color="white">
          Sign Up
        </Typography>
      </CardHeader>
      <form onSubmit={handleSubmit(handleRegister)} className="grid gap-4 mb-4 p-4" noValidate>
        <div className="grid gap-1">
          <input
            {...register("fullName", {
              required: {
                value: true,
                message: "This field is required"
              }
            })}
            aria-label="Full Name"
            placeholder="Nickname*"
            className={`${inputStyles} ${errors.fullName ? 'border-red outline-none focus:border-red' : ''}`}
            type="text"
            name="fullName"
          />
          {errors.fullName && (
            <span className="text-red">{errors.fullName.message}</span>
          )}
        </div>
        <div className="grid gap-1">
          <input
            {...register("email", {
              required: {
                value: true,
                message: "This field is required"
              },
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email address"
              }
            })}
            aria-label="Email"
            placeholder="Email*"
            className={`${inputStyles} ${errors.email ? 'border-red outline-none focus:border-red' : ''}`}
            type="email"
            name="email"
          />
          {errors.email &&
            <span className="text-red">{errors.email?.message}</span>
          }
        </div>
        <div className="grid gap-1">
          <input
            {...register("password", {
              required: {
                value: true,
                message: "This field is required"
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
              }
            })}
            aria-label="Password"
            placeholder="Password*"
            className={`${inputStyles} ${errors.password ? 'border-red outline-none focus:border-red' : ''}`}
            type="password"
            name="password"
          />
          {errors.password &&
            <span className="text-red">{errors.password?.message}</span>
          }
        </div>
        <div className="grid gap-1">
          <input
            {...register("cityCountry", {
              required: {
                value: true,
                message: "This field is required"
              }
            })}
            aria-label="City and Country"
            placeholder="City, Country*"
            className={inputStyles}
            type="text"
            name="cityCountry"
          />
          {errors.cityCountry &&
            <span className="text-red">{errors.cityCountry?.message}</span>
          }
        </div>
        <div className="grid gap-1">
          <input
            {...register("profession", {
              required: {
                value: true,
                message: "This field is required"
              }
            })}
            aria-label="profession"
            placeholder="Profession*"
            className={inputStyles}
            type="text"
            name="profession"
          />
          {errors.profession &&
            <span className="text-red">{errors.profession?.message}</span>
          }
        </div>
        <Button type="submit" className="bg-grey hover:bg-green hover:text-off_black" fullWidth>
          Sign Up
        </Button>
      </form>

      <CardFooter className="pt-0">
        <Typography variant="small" className="flex justify-center text-white">
          Do you have an account?
          <Link className="text-green ml-1 font-bold" to="/login">Sign In</Link>
        </Typography>
      </CardFooter>
    </Card >
  )
}

export default Register
