import makeRequest from "@/utils/makeRequest";
import { useEffect, useState } from "react";
import parser from "html-react-parser";
import { Input } from "./ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { limitWord } from "@/utils/limitWord";
import { parseDate } from "@/utils/paresDate";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { readTime } from "@/utils/readTime";
import PaginationComp from "./PaginationComp";

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginationData, setPaginationData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeRequest(
          "GET",
          `https://blog-lwf2.onrender.com/api/posts?search=${searchTerm}&page=${pageNumber}&limit=10`,
          null,
          {},
          setLoading
        );
        console.log(response);
        setPosts(response.data.data);
        setPaginationData(response.data.meta);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [pageNumber, searchTerm]);

  // console.log(posts);
  if (!loading && posts.length < 1) {
    return (
      <div className="text-center text-xl min-h-[80vh] font-bold">
        No Data Available
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-start items-start gap-5 m-5 min-h-[80vh]">
      <Input
        className="mb-8 border-gray-300 lg:w-[70%]"
        placeholder="Search posts by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="flex flex-col gap-3 w-full lg:w-[70%]">
          {posts &&
            posts.map((post) => (
              <Link key={post._id} to={`/${post._id}`}>
                <Card className="w-full">
                  <CardHeader className="flex gap-2">
                    <CardTitle>{parser(post.title)}</CardTitle>
                    <div className="text-gray-500 flex gap-5">
                      <p className="flex flex-col">
                        <span className="font-medium">Read time</span>
                        {readTime(post.content)} min
                      </p>
                      <p className="flex flex-col">
                        <span className="font-medium">Published on</span>
                        {parseDate(post.createdAt)}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm">
                      {parser(limitWord(post.content, 50))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          <PaginationComp
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pagination={paginationData}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
