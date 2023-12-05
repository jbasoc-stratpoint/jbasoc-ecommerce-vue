import { jwtDecode } from "jwt-decode";
import store from "@/store";

const TOKEN_CHECKER = {
  tokenValidator: () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);

      const tokenExpiration = decodedToken.exp as number;
      const now = Math.floor(new Date().getTime() / 1000);

      if (now > tokenExpiration) {
        store.dispatch("auth/logOut");
        /*
        router.push({ name: "login" })
        toast({
          variant: "destructive",
          description: "Token has expired. Please login again"
        })
        */
      }
    }
  },
};

export default TOKEN_CHECKER;
