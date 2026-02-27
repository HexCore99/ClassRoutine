import { useState } from "react";
import Input from "../Form/Input";
import Button from "../ui/Button";
import { selectEmailAddress } from "./loginSlice";
import { useSelector, useDispatch } from "react-redux";
import { verifyEmailCode } from "./loginSlice";

function Verification() {
  const dispatch = useDispatch();
  const email = useSelector(selectEmailAddress);
  const [otp, setOtp] = useState("");

  function handleVerification() {
    const data = dispatch(verifyEmailCode(otp)).unwrap();
    if (!data) alert("enter verified code");
    // routing part.
  }
  return (
    <div className="relative z-10 m-auto w-full max-w-md overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="bg-linear-to-r from-gray-800 to-gray-700 px-6 py-3">
        <p className="text-xs font-bold tracking-wider text-green-400">
          STEP 2/2 → VERIFICATION
        </p>
      </div>
      <div className="space-y-6 p-8">
        {/* Info Box */}
        <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
          <p className="text-xs text-blue-800">
            <span className="font-bold">CODE SENT TO:</span>
            <span>{email}</span>
          </p>
        </div>

        <Input
          label="Verification Code"
          placeholder="Enter 6-digit code"
          value={otp}
          onChange={setOtp}
          className="text-center text-lg font-bold tracking-widest"
          maxLength={6}
        />

        <div className="space-y-3">
          <Button
            className="w-full rounded-md bg-linear-to-r from-green-600 to-green-500 px-4 py-3 text-sm font-bold tracking-wide text-white uppercase transition-all duration-200 hover:from-green-700 hover:to-green-600"
            onClick={handleVerification}
          >
            Verify & Login →
          </Button>

          <Button className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-bold tracking-wide text-gray-700 uppercase transition-all duration-200 hover:bg-gray-50">
            Resend Code
          </Button>
        </div>

        <div className="pt-4 text-center">
          <p className="text-xs text-gray-500">
            Check your inbox and spam folder for the verification code.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Verification;
