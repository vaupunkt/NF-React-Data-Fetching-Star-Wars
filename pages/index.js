import styled from "styled-components";
import Link from "next/link";
import Layout from "../components/Layout";
import useSWR from "swr";

const url = "https://swapi.dev/api/";
const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function HomePage() {
  const { data, error, isLoading } = useSWR(url + "/people", fetcher);
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;
  const listPeople = data.results;
  return (
    <Layout>
      <h1>React Data Fetching: Star Wars</h1>
      <List>
        {listPeople.map((person, index) => {
          return (
            <li key={index}>
              <StyledLink href={"/characters/" + (index + 1)}>
                {person.name}
              </StyledLink>
            </li>
          );
        })}
      </List>
    </Layout>
  );
}

const List = styled.ul`
  background-color: var(--color-light);
  list-style-type: "➡️ ";
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--color-dark);
`;
