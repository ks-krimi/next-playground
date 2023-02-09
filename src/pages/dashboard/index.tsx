import { useEffect, useState } from "react";

interface IDashboardData {
  posts: number;
  likes: number;
  followers: number;
  following: number;
}

function Dashboard() {
  const [data, setData] = useState<IDashboardData | null>(null);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const response = await fetch("http://localhost:4000/dashboard", {
        method: "GET",
      });
      const data: IDashboardData = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

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
