import { useMutation } from "@tanstack/react-query";
import { verifyMfaService } from "../services/authService";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useVerifyMfa = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyMfaService,
    mutationKey: ["verify-mfa"],
    onSuccess: (data) => {
      if (!data || !data.user) {
        toast.error("Invalid MFA response from server");
        return;
      }

      
      login(data.user, null);

      toast.success("Login successful");

      if (data.user.role === "admin") {
        navigate("/admins/categoryy");
      } else {
        navigate("/dashboard");
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Invalid or expired OTP");
    },
  });
};