/* Файл для работы с API вакансий. Он должен знать, откуда брать данные, 
как отправлять запрос и в каком виде вернуть ответ приложению */

import type { VacancyResponse } from './types';

const BASE_URL = 'https://api.hh.ru/vacancies';
const PER_PAGE = 10;
const HH_USER_AGENT = 'frontend-jobs/1.0 (dasha@example.com)';

export async function fetchVacancies(): Promise<VacancyResponse> {
  const params = new URLSearchParams({
    industry: '7',
    professional_role: '96',
    per_page: PER_PAGE.toString(),
    page: '0',
  });

  try {
    console.log('=== Fetching vacancies with params:', params.toString());

    const response = await fetch(`${BASE_URL}?${params.toString()}`, {
      headers: {
        'HH-User-Agent': HH_USER_AGENT,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch vacancies: ${response.status}`);
    }

    const data: VacancyResponse = await response.json();

    console.log('=== API response data:', data);
    return data;
  } catch (error) {
    console.error('===Error fetching vacancies:', error);
    throw error;
  }
}
