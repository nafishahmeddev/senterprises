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

  static get = (passportId: number) => {
    return ApiRequest.get(`/v1/passports/${passportId}`).then((res) => {
      const resp = res.data as ApiResponse<{ passport: Passport, files: PassportFile[]; fields: PassportField[] }>;
      return resp;
    });
  }

  static create = (data: Partial<Passport>) => {
    return ApiRequest.post("/v1/passports", data).then((res) => {
      const resp = res.data as ApiResponse<{ passport_id: number }>;
      return resp;
    });
  }

  static update = (passportId: number, data: Partial<Passport>) => {
    return ApiRequest.put(`/v1/passports/${passportId}`, data).then((res) => {
      const resp = res.data as ApiResponse<{ passport_id: number }>;
      return resp;
    });
  }

  static delete = (passportId: number) => {
    return ApiRequest.delete(`/v1/passports/${passportId}`).then((res) => {
      const resp = res.data as ApiResponse<{ passport_id: number }>;
      return resp;
    });
  }


  /**
   * Get all files associated with a passport
   * @param passportId The ID of the passport
   * @returns A promise that resolves to an array of files
   */
  static getAllFiles = (passportId: number) => {
    return ApiRequest.get(`/v1/passports/${passportId}/files`).then((res) => {
      const resp = res.data as ApiResponse<{ files: PassportFile[] }>;
      return resp;
    });
  }

  /**
   * Upload a file to a passport
   * @param passportId The ID of the passport
   * @param file The file to upload
   * @returns A promise that resolves to the uploaded file information
   */
  static uploadFile = (passportId: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return ApiRequest.post(`/v1/passports/${passportId}/files`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {
      const resp = res.data as ApiResponse<{ file: PassportFile }>;
      return resp;
    });
  }

  /**
   * Delete a file from a passport
   * @param passportId The ID of the passport
   * @param fileId The ID of the file to delete
   * @returns A promise that resolves to the deleted file information
   */
  static deleteFile = (passportId: number, fileId: number) => {
    return ApiRequest.delete(`/v1/passports/${passportId}/files/${fileId}`).then((res) => {
      const resp = res.data as ApiResponse<{ passport_file_id: number }>;
      return resp;
    });
  }

  /**
   * Get all fields for a passport
   * @param passportId The ID of the passport
   * @returns A promise that resolves to an array of custom fields
   */
  static getAllFields = (passportId: number) => {
    return ApiRequest.get(`/v1/passports/${passportId}/fields`).then((res) => {
      const resp = res.data as ApiResponse<{ fields: PassportField[] }>;
      return resp;
    });
  }

  static upsertField = (passportId: number, field: Partial<PassportField>) => {
    return ApiRequest.post(`/v1/passports/${passportId}/fields`, field).then((res) => {
      const resp = res.data as ApiResponse<{ field: PassportField }>;
      return resp;
    });
  }

  static deleteField = (passportId: number, fieldId: number) => {
    return ApiRequest.delete(`/v1/passports/${passportId}/fields/${fieldId}`).then((res) => {
      const resp = res.data as ApiResponse<{ passport_field_id: number }>;
      return resp;
    });
  }

}
