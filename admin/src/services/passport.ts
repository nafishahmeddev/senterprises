import { ApiRequest } from "@app/lib/axios";

export interface PassportSearchParams {
  keyword?: string;
  page: number;
  limit: number;
  passport_number?: string;
  mofa_number?: string;
  company?: string;
  agent?: string;
  date_from?: string;
  date_to?: string;
}

export default class PassportApi {
  static all = (params: PassportSearchParams) => {
    // Filter out empty string values to not send them to the API
    const cleanParams = Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string | number>);

    return ApiRequest.get("/v1/passports", {
      params: cleanParams
    }).then((res) => {
      const resp = res.data as ApiResponse<{
        records: Passport[];
        count: number;
      }>

      return resp;
    });
  }
}
