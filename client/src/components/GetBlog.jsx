import makeRequest from "@/utils/makeRequest";
import { useEffect, useState } from "react";
import parser from "html-react-parser";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { parseDate } from "@/utils/paresDate";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import { readTime } from "@/utils/readTime";

function GetBlog() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeRequest(
          "GET",
          `http://localhost:5000/api/posts/${id}`,
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
  }, [id]);

  //   console.log(posts);
  return (
    <div className="flex flex-col justify-start items-start gap-5 m-10">
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="flex flex-col gap-3 w-full">
          {posts && (
            <Card className="overflow-hidden w-full">
              <CardHeader className="flex gap-2">
                <CardTitle>{parser(posts.title)}</CardTitle>
                <div className="text-gray-500 flex gap-5">
                  <p className="flex flex-col">
                    <span className="font-medium">Read time</span>
                    {readTime(posts.content)} min
                  </p>
                  <p className="flex flex-col">
                    <span className="font-medium">Published on</span>
                    {parseDate(posts.createdAt)}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm">{parser(posts.content)}</div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

export default GetBlog;
