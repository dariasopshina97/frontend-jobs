import { Stack } from '@mantine/core';
import { VacancyCard } from './VacancyCard/VacancyCard';

type VacancyListItem = {
  id: string;
  title: string;
  salary: string;
  experience: string;
  format: string;
  company: string;
  city: string;
  vacancyUrl: string;
};

type VacancyListProps = {
  vacancies: VacancyListItem[];
};

export function VacancyList({ vacancies }: VacancyListProps) {
  return (
    <Stack gap="md">
      {vacancies.map((vacancy) => (
        <VacancyCard
          key={vacancy.id}
          title={vacancy.title}
          salary={vacancy.salary}
          experience={vacancy.experience}
          format={vacancy.format}
          company={vacancy.company}
          city={vacancy.city}
          vacancyUrl={vacancy.vacancyUrl}
        />
      ))}
    </Stack>
  );
}
