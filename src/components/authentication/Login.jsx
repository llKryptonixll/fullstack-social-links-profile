import {
  Card,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { auth } from '../../firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const Login = () => {

  useAuth("/social-links");
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, getValues("email"), getValues("password"));
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`${errorCode}: ${errorMessage}`);
    }
  }

  const inputStyles = "rounded-md border-[1px] border-white bg-transparent h-[45px] pl-4 placeholder:text-white text-white focus:outline-none focus:border-green focus:border-2";

  return (
    <Card className="max-w-96 w-full bg-dark_grey">
      <CardHeader
        className="mb-4 grid h-28 place-items-center bg-grey"
      >
        <Typography className="text-4xl" variant="h1" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <form onSubmit={handleSubmit(handleLogin)} className="grid gap-4 mb-4 p-4" noValidate>
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
            placeholder="Email"
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
              required: "This field is required",
            })}
            aria-label="Password"
            placeholder="Password"
            className={`${inputStyles} ${errors.password ? 'border-red outline-none focus:border-red' : ''}`}
            type="password"
            name="password"
          />
          {errors.password &&
            <span className="text-red">{errors.password?.message}</span>
          }
        </div>
        <Button type="submit" className="bg-grey hover:bg-green hover:text-off_black" fullWidth>
          Sign In
        </Button>
      </form>
      <CardFooter className="pt-0">
        <Typography variant="small" className="flex justify-center text-white">
          Don&apos;t have an account?
          <Link className="text-green font-bold ml-1" to="/">Sign Up</Link>
        </Typography>
      </CardFooter>
    </Card>
  )
}

export default Login