import { useEffect, useState } from 'react';
import {
  Container,
  Stack,
  Flex,
  Paper,
  Center,
  Pagination,
} from '@mantine/core';
import { Header } from './components/Header/Header';
import { SkillsFilter } from './features/vacancies/SkillsFilter/SkillsFilter';
import { CityFilter } from './features/vacancies/CityFilter/CityFilter';
import { VacancyList } from './features/vacancies/VacancyList';
import { VacancyHero } from './features/vacancies/VacancyHero/VacancyHero';
import { mockVacancies } from './features/vacancies/mocks';
import './App.css';

// Test
import { fetchVacancies } from './features/vacancies/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchVacancies();
  }, []);

  return (
    <>
      <Header />

      <main>
        <Container size="lg" py="xl">
          <Stack gap="xl">
            <VacancyHero />

            <Flex className="contentLayout" gap="xl" align="flex-start">
              <Stack className="filtersColumn" gap="md">
                <Paper withBorder radius="md" p="lg">
                  <SkillsFilter />
                </Paper>

                <Paper withBorder radius="md" p="lg">
                  <CityFilter />
                </Paper>
              </Stack>

              <Stack className="resultsColumn" gap="lg">
                <VacancyList vacancies={mockVacancies} />

                <Paper withBorder radius="md" p="lg">
                  <Center>
                    <Pagination
                      value={currentPage}
                      onChange={setCurrentPage}
                      total={1}
                    />
                  </Center>
                </Paper>
              </Stack>
            </Flex>
          </Stack>
        </Container>
      </main>
    </>
  );
}
