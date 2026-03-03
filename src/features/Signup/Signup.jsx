import { useState } from "react";
import Input from "../Form/Input";
import Button from "../ui/Button";
import Error from "../Login/Error";
import { useDispatch, useSelector } from "react-redux";
import { selectSignedUp } from "./signupslice";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "./signupSlice";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { status, err } = useSelector(selectSignedUp);
  const navigate = useNavigate();

  async function handleSignUp() {
    if (status === "loading") return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert("please enter a valid email address");
      return;
    }

    try {
      console.log(email, password);
      await dispatch(signupUser({ email: email.trim(), password })).unwrap();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="relative z-10 m-auto w-xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="bg-linear-to-r from-gray-800 to-gray-700 px-6 py-3">
        <p className="text-xs font-bold tracking-wider text-green-400">
          → CREDENTIALS
        </p>
      </div>
      <div className="space-y-6 p-8">
        {err && <Error role="alert" err={err} />}

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={setEmail}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter you password here"
          value={password}
          onChange={setPassword}
        />

        <Button
          className="w-full bg-linear-to-r from-green-600 to-green-500 text-white uppercase"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>

        <p className="text-center text-sm text-gray-600">
          <Link to="/login" className="font-semibold text-green-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
