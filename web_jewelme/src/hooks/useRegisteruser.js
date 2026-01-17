import { useMutation } from "@tanstack/react-query";
import { registerUserService } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useRegisterUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUserService,
    mutationKey: ["register"],
    onSuccess: () => {
      toast.success("Registration successful");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err?.message || "Registration failed");
    },
  });
};
