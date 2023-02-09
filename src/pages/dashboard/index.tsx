import useSWR from "swr";

interface IDashboardData {
  posts: number;
  likes: number;
  followers: number;
  following: number;
}

const fetcher = async function fetchData(): Promise<IDashboardData> {
  const response = await fetch("http://localhost:4000/dashboard", {
    method: "GET",
  });
  const data: IDashboardData = await response.json();
  return data;
};

function Dashboard() {
  const { data, error, isLoading } = useSWR("/dashboard", fetcher);

  if (error) return <div>An error occured</div>;
  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>posts: {data.posts}</p>
      <p>likes: {data.likes}</p>
      <p>followers: {data.followers}</p>
      <p>following: {data.following}</p>
    </div>
  );
}

export default Dashboard;
