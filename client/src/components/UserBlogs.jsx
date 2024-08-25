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
import { useAuth } from "@/context";
import { Button } from "./ui/button";
import { EyeOff, Loader2, ScanEye } from "lucide-react";
import DeleteAlert from "./DeleteAlert";
import UpdatePost from "./UpdatePost";
import { toast } from "sonner";
import PaginationComp from "./PaginationComp";

function UserBlogs() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState({
    isLoading: false,
    operation: null,
    for: null,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [paginationData, setPaginationData] = useState({});
  const { token } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading({ isLoading: true, operation: "fetch", for: null });
        const response = await makeRequest(
          "GET",
          `https://blog-lwf2.onrender.com/api/user?search=${searchTerm}&page=${pageNumber}&limit=10`,
          null,
          { Authorization: `Bearer ${token}` }
        );
        setPosts(response.data.data);
        setPaginationData(response.data.meta);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading({ isLoading: false, operation: null, for: null });
      }
    };

    fetchData();
  }, [pageNumber, searchTerm, token]);

  const handleDelete = async (id) => {
    try {
      setLoading({ isLoading: true, operation: "delete", for: id });
      const response = await makeRequest(
        "DELETE",
        `https://blog-lwf2.onrender.com/api/posts/${id}`,
        null,
        { Authorization: `Bearer ${token}` }
      );

      if (response.status === 200) {
        setPosts(posts.filter((post) => post._id !== id));
        toast.success("Post Deleted Successfully", {
          action: {
            label: "Undo",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error while deleting", {
        action: {
          label: "Undo",
        },
      });
    } finally {
      setLoading({ isLoading: false, operation: null });
    }
  };
  const handlePublish = async (id, publishStatus) => {
    try {
      setLoading({ isLoading: true, operation: publishStatus, for: id });
      const response = await makeRequest(
        "PUT",
        `https://blog-lwf2.onrender.com/api/posts/publish/${id}`,
        { publishStatus },
        { Authorization: `Bearer ${token}` }
      );
      if (response.status === 200) {
        setPosts(
          posts.map((post) =>
            post._id === id ? { ...post, published: !post.published } : post
          )
        );
        toast.success(
          publishStatus === "publish"
            ? "Post Published Successfully"
            : "Post Unpublished Successfully",
          {
            action: {
              label: "Undo",
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error Publishing Post", {
        action: {
          label: "Undo",
        },
      });
    } finally {
      setLoading({ isLoading: false, operation: null });
    }
  };

  return (
    <div className="flex flex-col justify-start items-start gap-5 m-5 min-h-[80vh] md:w-full">
      <Input
        disabled={posts.length === 0}
        className="mb-8 border-gray-300"
        placeholder="Search posts by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading.isLoading && loading.operation === "fetch" ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="flex flex-col gap-3 w-full">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id}>
                <Card className="w-full">
                  <Link to={`/${post._id}`}>
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
                      <div>{parser(limitWord(post.content, 50))}</div>
                    </CardContent>
                  </Link>
                  <div className="flex flex-wrap justify-between items-center gap-2 m-2">
                    <DeleteAlert
                      handleDelete={() => handleDelete(post._id)}
                      loading={
                        loading.isLoading &&
                        loading.operation === "delete" &&
                        loading.for === post._id
                      }
                    />

                    <UpdatePost post={post} setPosts={setPosts} />
                    {!post.published ? (
                      <Button
                        onClick={() => handlePublish(post._id, "publish")}
                        variant="outline"
                        className="flex items-center gap-2 w-full lg:w-52 text-green-600 hover:text-green-800 transition-colors border-2 border-green-300 hover:bg-green-50"
                      >
                        {loading.isLoading &&
                        loading.operation === "publish" &&
                        loading.for === post._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            Publish <ScanEye className="ml-1 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handlePublish(post._id, "unpublish")}
                        variant="outline"
                        className="flex items-center gap-2 w-full md:w-52 text-green-600 hover:text-green-800 transition-colors border-2 border-green-300 hover:bg-green-50"
                      >
                        {loading.isLoading &&
                        loading.operation === "unpublish" &&
                        loading.for === post._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            Un Publish <EyeOff className="ml-1 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center min-h-[60vh]">
              <p className="text-gray-500 font-xl font-bold text-center">
                You Don&apos;t have any post,{" "}
                <Link to={"/create"} className="underline text-gray-700">
                  create one now
                </Link>
              </p>
            </div>
          )}
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

export default UserBlogs;
