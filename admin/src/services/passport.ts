import { ApiRequest } from "@app/lib/axios";
export default class PassportApi {
  static all = ({ keyword, limit, page }: {
    keyword: string;
    page: number;
    limit: number;
  }) => {
    return ApiRequest.get("/v1/passports", {
      params: { keyword, page, limit }
    }).then((res) => {
      const resp = res.data as ApiResponse<{
        records: Passport[];
        pages: number;
        page: number;
      }>

      return resp;
    });
  }
}
