import { useState } from "react";
import Input from "../Form/Input";
import Button from "../ui/Button";
import Error from "./Error";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin, sendVerificationCode } from "./loginSlice";
import { useNavigate } from "react-router-dom";

function Credentials() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { status, err } = useSelector(selectLogin);
  const navigate = useNavigate();

  async function handleSendVerification() {
    if (status === "loading") return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert("please enter a valid email address");
      return;
    }

    try {
      await dispatch(sendVerificationCode({ fullName: name, email })).unwrap();
      navigate("/verification");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="relative z-10 m-auto w-xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="bg-linear-to-r from-gray-800 to-gray-700 px-6 py-3">
        <p className="text-xs font-bold tracking-wider text-green-400">
          STEP 1/2 → CREDENTIALS
        </p>
      </div>
      <div className="space-y-6 p-8">
        {err && <Error role="alert" err={err} />}

        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChange={setName}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={setEmail}
        />

        <Button
          className="w-full bg-linear-to-r from-green-600 to-green-500 text-white uppercase"
          onClick={handleSendVerification}
        >
          Send Verification Code →
        </Button>
      </div>
    </div>
  );
}

export default Credentials;
