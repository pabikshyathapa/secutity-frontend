import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../services/authService";
import { toast } from "react-toastify";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUserService,
    mutationKey: ["login"],
    onSuccess: () => {
      toast.success("OTP sent to your email");
    },
    onError: (err) => {
      toast.error(err?.message || "Login failed");
    },
  });
};
