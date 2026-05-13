export interface VacancySalary {
  currency: string;
  from: number | null;
  to: number | null;
  gross: boolean;
}

export interface VacancyEmployer {
  name: string;
}

export interface VacancyExperience {
  name: string;
}

export interface VacancyArea {
  name: string;
}

export interface VacancySchedule {
  name: string;
}

export interface VacancyWorkFormat {
  name: string;
}

export interface Vacancy {
  id: string;
  name: string;
  alternate_url: string;
  salary: VacancySalary | null;
  employer: VacancyEmployer;
  experience?: VacancyExperience | null;
  area: VacancyArea;
  schedule: VacancySchedule | null;
  work_format?: VacancyWorkFormat[];
}

export interface VacancyResponse {
  items: Vacancy[];
  found: number;
  pages: number;
  page: number;
  per_page: number;
}

export interface VacancyCardData {
  id: string;
  title: string;
  salary: string;
  experience: string;
  format: string;
  company: string;
  city: string;
  vacancyUrl: string;
}

export interface FetchVacanciesParams {
  page: number;
  search: string;
  text: string;
  area: string;
  skills: string[];
  searchField?: 'name' | 'company_name';
}
