/* Файл для работы с API вакансий. Он должен знать, откуда брать данные, 
как отправлять запрос и в каком виде вернуть ответ приложению */

import type { VacancyResponse } from './types';
import vacanciesMock from '../../mocks/vacancies.json';

// const BASE_URL = 'https://api.hh.ru/vacancies';

type HttpError = Error & { status?: number };

export async function fetchVacancies(params: {
  page: number;
  skills: string[];
  search: string;
  city: string;
  searchField?: 'name' | 'company_name';
}): Promise<VacancyResponse> {
  const { page, skills, search, city } = params;

  const area = city === 'moscow' ? 1 : city === 'petersburg' ? 2 : undefined;

  const query = new URLSearchParams({
    text: search,
    per_page: '10',
    page: (page - 1).toString(),
    industry: '7',
    professional_role: '96',
    ...(area ? { area: area.toString() } : {}),
  });

  // const res = await fetch(`${BASE_URL}?${query.toString()}`);

  // console.log('=== response:', res);

  // if (!res.ok) {
  //   const error: HttpError = new Error('Ошибка при загрузке вакансий');
  //   error.status = res.status;
  //   throw error;
  // }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...(vacanciesMock as unknown as VacancyResponse),
        found: vacanciesMock.items.length,
        page: page - 1,
      });
    }, 1000);
  });
}

// import type { VacancyResponse } from './types';

// const BASE_URL = 'https://api.hh.ru/vacancies';
// const PER_PAGE = 10;
// const HH_USER_AGENT = 'frontend-jobs/1.0 (dasha@example.com)';

// export async function fetchVacancies(): Promise<VacancyResponse> {
//   const params = new URLSearchParams({
//     industry: '7',
//     professional_role: '96',
//     per_page: PER_PAGE.toString(),
//     page: '0',
//   });

//   try {
//     console.log('=== Fetching vacancies with params:', params.toString());

//     const response = await fetch(`${BASE_URL}?${params.toString()}`, {
//       headers: {
//         'HH-User-Agent': HH_USER_AGENT,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch vacancies: ${response.status}`);
//     }

//     const data: VacancyResponse = await response.json();

//     console.log('=== API response data:', data);
//     return data;
//   } catch (error) {
//     console.error('===Error fetching vacancies:', error);
//     throw error;
//   }
// }
