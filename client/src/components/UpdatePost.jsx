/* eslint-disable react/prop-types */
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";
import { Loader2, SquareArrowOutUpRight } from "lucide-react";
import Tiptap from "./TextEditior";
import { useRef, useState } from "react";
import makeRequest from "@/utils/makeRequest";
import { useAuth } from "@/context";
import { toast } from "sonner";

function UpdatePost({ post, setPosts }) {
  const [data, setData] = useState({
    title: post.title,
    content: post.content,
  });
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();
  const sheetCloseRef = useRef(null);

  const handleContentData = (html) => {
    setData({ ...data, content: html });
  };
  const handleTitleData = (html) => {
    setData({ ...data, title: html });
  };

  const handleSubmit = async () => {
    try {
      const response = await makeRequest(
        "PUT",
        `http://localhost:5000/api/posts/${post._id}`,
        data,
        { Authorization: `Bearer ${token}` },
        setLoading
      );

      console.log(response);
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p._id === post._id
              ? { ...p, title: data.title, content: data.content }
              : p
          )
        );

        if (sheetCloseRef.current) {
          sheetCloseRef.current.click();
        }
        toast.success("Post Updated Successfully", {
          action: {
            label: "Undo",
          },
        });
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast.error(error.response?.data?.message || "Error Updating Post", {
        action: {
          label: "Undo",
        },
      });
    }
  };

  return (
    <Sheet className="w-screen">
      <SheetTrigger className="max-lg:w-full">
        <Button
          variant="outline"
          className="flex items-center gap-2 w-full lg:w-52 text-blue-600 hover:text-blue-800 transition-colors border-2 border-blue-300 hover:bg-blue-50"
        >
          Update <SquareArrowOutUpRight className="ml-1 h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader className="w-full">
          <SheetTitle className="text-xl font-semibold mb-5">Update</SheetTitle>
          <div className="flex flex-col gap-4 w-full">
            <div className="border border-gray-300 rounded-md">
              <Tiptap content={data.title} getHtmlData={handleTitleData} />
            </div>
            <div className="border border-gray-300 rounded-md">
              <Tiptap content={data.content} getHtmlData={handleContentData} />
            </div>
          </div>
        </SheetHeader>
        <SheetFooter className="flex justify-between items-center gap-3 mt-5">
          <Button
            variant="outline"
            className="w-full border-gray-300"
            onClick={handleSubmit}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update"}
          </Button>
          <SheetClose ref={sheetCloseRef} asChild>
            <Button variant="destructive" className="w-full">
              CLose
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default UpdatePost;
