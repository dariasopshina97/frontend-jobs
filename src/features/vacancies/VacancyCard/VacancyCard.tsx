import { Badge, Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import styles from './VacancyCard.module.css';

type VacancyCardProps = {
  title: string;
  salary: string;
  experience: string;
  format: string;
  company: string;
  city: string;
  vacancyUrl: string;
};

export function VacancyCard({
  title,
  salary,
  experience,
  format,
  company,
  city,
  vacancyUrl,
}: VacancyCardProps) {
  return (
    <Paper withBorder radius="md" p="xl">
      <Stack gap="md">
        <Stack gap={4}>
          <Title order={3} className={styles.title}>
            {title}
          </Title>

          <Group gap={16}>
            <Text className={styles.salary}>{salary}</Text>
            <Text className={styles.experience}>{experience}</Text>
          </Group>
        </Stack>

        <Stack gap={5}>
          <Text className={styles.company}>{company}</Text>
          <Badge className={styles.formatBadge}>{format}</Badge>
          <Text className={styles.city}>{city}</Text>
        </Stack>

        <Group gap={14}>
          <Button className={styles.primaryButton}>Смотреть вакансию</Button>
          <Button
            component="a"
            href={vacancyUrl}
            target="_blank"
            className={styles.secondaryButton}
          >
            Откликнуться
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
