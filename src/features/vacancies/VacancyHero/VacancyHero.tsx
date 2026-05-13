import { IconSearch } from '@tabler/icons-react';
import { Flex, Stack, Text, TextInput, Title, Button } from '@mantine/core';
import styles from './VacancyHero.module.css';

type VacancyHeroProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
};

export function VacancyHero({
  search,
  onSearchChange,
  onSearchSubmit,
}: VacancyHeroProps) {
  return (
    <section className={styles.hero}>
      <Flex justify="space-between" align="end" gap="lg" wrap="wrap">
        <Stack gap={2} className={styles.textBlock}>
          <Title order={1} className={styles.title}>
            Список вакансий
          </Title>
          <Text className={styles.subtitle}>
            по профессии Frontend-разработчик
          </Text>
        </Stack>

        <Flex gap="xs" align="center" className={styles.searchForm}>
          <TextInput
            placeholder="Должность или название компании"
            className={styles.search}
            value={search}
            onChange={(event) => onSearchChange(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onSearchSubmit();
              }
            }}
            leftSection={<IconSearch size={12} color="#0F0F104D" />}
          />
          <Button className={styles.searchButton} onClick={onSearchSubmit}>
            Найти
          </Button>
        </Flex>
      </Flex>
    </section>
  );
}
