import makeRequest from "@/utils/makeRequest";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import parser from "html-react-parser";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeRequest(
          "GET",
          "http://localhost:5000/api/posts",
          null,
          {},
          setLoading
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(posts);
  return (
    <div className="flex flex-col gap-5">
      {loading ? (
        <div className="w-full flex justify-center items-start min-h-screen">
          <Loader2 className="h-8 animate-spin" />
        </div>
      ) : (
        <div>
          {posts &&
            posts.map((post) => (
              <div key={post._id}>
                <div>{parser(post.title)}</div>
                <div>{parser(post.content)}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Home;
