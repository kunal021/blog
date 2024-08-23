import { useState } from "react";
import Tiptap from "./TextEditior";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import makeRequest from "@/utils/makeRequest";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context";

const BlogEditor = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    content: "",
    published: false,
  });
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  const handleSubmit = async (publish) => {
    try {
      const response = await makeRequest(
        "POST",
        "http://localhost:5000/api/posts",
        {
          ...data,
          published: publish,
        },
        {
          Authorization: `Bearer ${token}`,
        },
        setLoading
      );

      console.log(response);
      if (response.status === 201) {
        setData({
          title: "",
          content: "",
          published: false,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  const handleContentData = (html) => {
    setData({ ...data, content: html });
  };
  const handleTitleData = (html) => {
    setData({ ...data, title: html });
  };

  return (
    <div className="flex flex-col min-h-[80vh] justify-between gap-5 mx-2 md:mx-10 mb-5">
      <div className="flex flex-col gap-10">
        <h3 className="text-xl font-black sm:text-3xl md:text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-100 p-5">
          Write your stories and ideas here
        </h3>

        <div className="border border-gray-300 rounded-md">
          <Tiptap getHtmlData={handleTitleData} placeholder={"Title"} />
        </div>

        <div className="border border-gray-300 rounded-md">
          <Tiptap
            getHtmlData={handleContentData}
            placeholder={"Start Typing..."}
          />
        </div>
      </div>
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-5">
        <Button
          disabled={loading}
          variant="destructive"
          className="w-full md:w-60"
          onClick={() => handleSubmit(false)}
        >
          {loading ? <Loader2 className="h-6 animate-spin" /> : "Save as Draft"}
        </Button>
        <Button
          disabled={loading}
          variant="outline"
          className="w-full md:w-60 border-gray-300"
          onClick={() => handleSubmit(true)}
        >
          {loading ? <Loader2 className="h-6 animate-spin" /> : "Upload"}
        </Button>
      </div>
    </div>
  );
};

export default BlogEditor;
