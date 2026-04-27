import { useState, type KeyboardEvent } from 'react';
import {
  Group,
  Pill,
  PillGroup,
  Stack,
  Text,
  TextInput,
  ActionIcon,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import styles from './SkillsFilter.module.css';

const INITIAL_SKILLS = [
  'JavaScript',
  'React',
  'Redux',
  'ReduxToolkit',
  'Next.js',
];

export function SkillsFilter() {
  const [skills, setSkills] = useState<string[]>(INITIAL_SKILLS);
  const [newSkill, setNewSkill] = useState('');

  function handleAddSkill() {
    const trimmed = newSkill.trim();

    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }

    setNewSkill('');
  }

  function handleRemoveSkill(skill: string) {
    setSkills(skills.filter((s) => s !== skill));
  }

  function handleSkillKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  }

  return (
    <Stack gap="md">
      <Text fw={700}>Ключевые навыки</Text>

      <Group gap="xs" align="center" wrap="nowrap">
        <TextInput
          placeholder="Навык"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleSkillKeyDown}
          className={styles.skillInput}
        />

        <ActionIcon onClick={handleAddSkill} className={styles.addSkillButton}>
          <IconPlus size={18} stroke={2.2} />
        </ActionIcon>
      </Group>

      {!!skills.length && (
        <PillGroup>
          {skills.map((skill) => (
            <Pill
              key={skill}
              withRemoveButton
              onRemove={() => handleRemoveSkill(skill)}
              className={styles.skillPill}
            >
              {skill}
            </Pill>
          ))}
        </PillGroup>
      )}
    </Stack>
  );
}
