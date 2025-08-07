import { ApiRequest } from "@app/lib/axios";
import { queryClient } from "@app/lib/query-client";
import AuthStore from "@app/store/auth";
export default class AuthApi {
  static login = (payload: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    return ApiRequest.post("/v1/auth/login", payload).then((res) => {
      const resp = res.data as ApiResponse<{
        tokens: {
          accessToken: string;
        };
        user: Admin;
      }>
      const response = resp.result;
      localStorage.setItem("accessToken", response.tokens.accessToken);
      AuthStore.login({
        accessToken: response.tokens.accessToken,
        user: response.user,
        loggedIn: true,
        loading: false,
      });
      return resp;
    });
  }

  static verify = () => {
    if (!localStorage.getItem("accessToken")) {
      AuthStore.logout();
      localStorage.removeItem("accessToken");
      return Promise.reject("No token found");
    }

    return ApiRequest.post(`/api/portal/auth/verify`)
      .then((res) => {
        const resp: ApiResponse<{
          user: Admin;
        }> = res.data;
        const response = resp.result;
        AuthStore.login({
          accessToken: localStorage.getItem("accessToken") as string,
          ...response,
          loggedIn: true,
          loading: false,
        });
        return resp;
      })
      .catch((e) => {
        AuthApi.logout();
        throw e;
      });
  };

  static logout = async () => {
    localStorage.removeItem("accessToken");
    AuthStore.logout();
    queryClient.invalidateQueries();
    queryClient.clear();
  };
}
