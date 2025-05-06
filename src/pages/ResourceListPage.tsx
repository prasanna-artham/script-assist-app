import { useQuery } from '@tanstack/react-query';
import {
  Card, Container, Grid, Title, Text, Button, Skeleton, TextInput,
} from '@mantine/core';
import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Person {
  name: string;
  birth_year: string;
}

interface PeopleResponse {
  results: Person[];
}

const fetchPeople = async (): Promise<PeopleResponse> => {
  const res = await fetch('https://swapi.py4e.com/api/people/');
  return res.json();
};

const ResourceListPage = () => {
  const { data, isLoading } = useQuery<PeopleResponse>(['people'], fetchPeople);

  // 1. Get and update query params
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // 2. Update the URL when searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);

  // 3. Filter based on query
  const filteredData = data?.results.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <Container>
        <Title>Loading Star Wars Characters...</Title>
        <Skeleton height={100} mt="md" radius="md" />
      </Container>
    );
  }

  return (
    <Container>
      <Title order={2} mb="xl" align="center">Star Wars Characters</Title>

      <TextInput
        label="Search Characters"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb="xl"
      />

      <Grid>
        {filteredData?.map((person, index) => (
          <Grid.Col key={index} span={12} sm={6} md={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4}>{person.name}</Title>
              <Text size="sm" color="dimmed">Birth Year: {person.birth_year}</Text>
              <Button
                component={Link}
                to={`/resources/${index + 1}`}
                variant="light"
                color="blue"
                mt="md"
                fullWidth
              >
                View Details
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default ResourceListPage;
