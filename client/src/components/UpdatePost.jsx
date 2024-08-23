/* eslint-disable react/prop-types */
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import Tiptap from "./TextEditior";

function UpdatePost({ post }) {
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
              <Tiptap content={post.title} />
            </div>
            <div className="border border-gray-300 rounded-md">
              <Tiptap content={post.content} />
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default UpdatePost;
