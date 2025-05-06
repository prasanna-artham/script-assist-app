import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Card,
  Title,
  Text,
  Stack,
  Group,
  Button,
  Divider,
  Loader,
  Flex
} from '@mantine/core';
import {
  IconArrowLeft,
  IconCake,
  IconEye,
  IconHome,
  IconRocket,
  IconVideo,
  IconRuler,
  IconWeight,
  IconUser
} from '@tabler/icons-react';

const fetchPerson = async (id: string) => {
  const res = await fetch(`https://swapi.py4e.com/api/people/${id}`);
  if (!res.ok) throw new Error('Failed to fetch person');
  return res.json();
};

const ResourceDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(['person', id], () => fetchPerson(id!));

  if (isLoading) {
    return (
      <Container>
        <Loader size="lg" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Text color="red">Failed to load character. Please try again later.</Text>
      </Container>
    );
  }

  return (
    <Container size="sm" mt="xl">
      <Flex justify="space-between" align="center" mb="md">
        <Button component={Link} to="/resources" variant="light" leftIcon={<IconArrowLeft />}>
          Back
        </Button>
      </Flex>

      <Card shadow="xl" radius="xl" padding="xl" withBorder>
        <Title order={2} align="center" mb="md">
          {data.name}
        </Title>

        <Divider label="Personal Info" labelPosition="center" mb="sm" />
        <Stack spacing="xs">
          <Group><IconRuler size={18} /><Text>Height: {data.height} cm</Text></Group>
          <Group><IconWeight size={18} /><Text>Mass: {data.mass} kg</Text></Group>
          <Group><IconUser size={18} /><Text>Hair Color: {data.hair_color}</Text></Group>
          <Group><IconEye size={18} /><Text>Eye Color: {data.eye_color}</Text></Group>
          <Group><IconCake size={18} /><Text>Birth Year: {data.birth_year}</Text></Group>
          <Group><IconHome size={18} /><Text>Home Planet: Tatooine</Text></Group>
        </Stack>

        <Divider my="md" label="Starships" labelPosition="center" />
        <Stack spacing="xs">
          {data.starships.length > 0 ? (
            data.starships.map((ship: string, i: number) => (
              <Text key={i}><IconRocket size={16} /> Starship URL: {ship}</Text>
            ))
          ) : (
            <Text color="dimmed">No starships available</Text>
          )}
        </Stack>

        <Divider my="md" label="Films" labelPosition="center" />
        <Stack spacing="xs">
          {data.films.length > 0 ? (
            data.films.map((film: string, i: number) => (
              <Text key={i}><IconVideo size={16} /> Film URL: {film}</Text>
            ))
          ) : (
            <Text color="dimmed">No films available</Text>
          )}
        </Stack>
      </Card>
    </Container>
  );
};

export default ResourceDetailPage;
