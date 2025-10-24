import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginAPI({ email, password }),
		onSuccess: (user) => {
			// OBS: We can set user data to the cache imediately after login
			queryClient.setQueriesData(["user"], user);
			// It'll avoid the useUser hook to make another request to the API when the ProtectedRoute component is rendered
			// Then, it'll get the user data from the cache

			navigate("/dashboard");
		},
		onError: (err) => {
			console.log("ERROR", err);
			toast.error("Provided email or password are incorrect");
		},
	});

	return { login, isLoading };
}
