// Supporting table interfaces
declare interface PassportFile {
  passport_file_id: number
  file_url: string
  passport_id: number
  file_size?: string
  file_type?: string
}

declare interface PassportField {
  passport_field_id: number
  name: string
  value: string
  passport_id: number
  upload_date: string
}

// Passport interface
declare interface Passport {
  passport_id: number
  first_name: string
  last_name: string
  date_of_birth: string
  issue_date: string
  agent: string
  office: string
  company: string
  upload_date: string
  mofa_no: string
  father_name: string
  mother_name: string
  address: string
  passport_number: string
  contact: string
  files?: PassportFile[]
  custom_fields?: PassportField[]
}
