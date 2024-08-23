/* eslint-disable react/prop-types */
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import CodeBlock from "@tiptap/extension-code-block";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import { FontSize } from "@/utils/FontSizeExtension";
import { CustomImage } from "@/utils/ImageExtension";
import {
  Bold,
  Code,
  Italic,
  ListOrdered,
  Strikethrough,
  Underline as ULIcon,
  List as LIIcon,
  Link2,
  Link2Off,
  //   Subscript as SUBIcon,
  //   Superscript as SUPIcon,
  Highlighter,
  Square,
  Heading as HIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  ChevronUp,
  ChevronDown,
  ALargeSmall,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import ImageUpload from "./FileUpload";

const Tiptap = ({ placeholder, getHtmlData, content = "" }) => {
  const [headingOptionOpen, setHeadingOptionOpen] = useState(false);
  const [fontSizeOpen, setFontSizeOpen] = useState(false);
  const [markerOpen, setMarkerOpen] = useState(false);
  // const [isFocused, setIsFocused] = useState(false);

  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: placeholder || "Write something...",
      }),
      StarterKit,
      Underline,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Link,
      OrderedList,
      Subscript,
      Superscript,
      Highlight.configure({ multicolor: true }),
      ListItem,
      CodeBlock,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      FontSize,
      FontFamily,
      CustomImage,
    ],
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl p-2 focus:outline-none`,
      },
    },
    content: `${content}`,
  });

  useEffect(() => {
    if (editor) {
      // const handleFocus = () => setIsFocused(true);
      // const handleBlur = (event) => {
      //   // Only hide the toolbar if the blur event is not triggered by clicking on the toolbar
      //   if (!event.relatedTarget?.closest(".toolbar")) {
      //     setIsFocused(false);
      //   }
      // };

      // editor.on("focus", handleFocus);
      // editor.on("blur", handleBlur);

      const updateContent = () => {
        getHtmlData(editor.getHTML());
      };

      editor.on("update", updateContent);

      return () => {
        // editor.off("focus", handleFocus);
        // editor.off("blur", handleBlur);
        editor.off("update", updateContent);
      };
    }
  }, [editor, getHtmlData]);

  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    let url = window.prompt("URL", previousUrl);

    if (url === null) return;

    const isAbsolute = /^(https?:\/\/)/i.test(url);
    if (!isAbsolute) {
      url = "https://" + url;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url, target: "_blank" })
      .run();
  };

  const fontSizeArray = ["8", "10", "14", "20", "28", "36", "48", "72"];
  const setFontSize = (size) => editor.chain().focus().setFontSize(size).run();
  const unSetFontSize = () => editor.chain().focus().unsetFontSize().run();
  const handleHeadingOptions = () => setHeadingOptionOpen((prev) => !prev);
  const handleFontSizeOptions = () => setFontSizeOpen((prev) => !prev);
  const handleMarkerOpen = () => setMarkerOpen((prev) => !prev);
  const insertImage = (url) => {
    editor
      .chain()
      .focus()
      .setImage({
        src: url,
        alt: "image",
      })
      .run();
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      {/* {isFocused && ( */}
      <div
        // onMouseDown={(e) => e.preventDefault()}
        className="sticky top-0 bg-gray-50 z-50 flex flex-wrap justify-center items-center gap-2 px-2 py-1 border-b border-b-gray-200 w-full"
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
        >
          <Bold className="h-4" />
        </button>
        <ImageUpload onImageUpload={insertImage} />
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
        >
          <Italic className="h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1 ${editor.isActive("underline") ? "bg-gray-200" : ""}`}
        >
          <ULIcon className="h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1 ${editor.isActive("strike") ? "bg-gray-200" : ""}`}
        >
          <Strikethrough className="h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-1 ${editor.isActive("codeBlock") ? "bg-gray-200" : ""}`}
        >
          <Code className="h-4" />
        </button>
        <div className="relative">
          <button
            onClick={handleHeadingOptions}
            className="flex p-1 border rounded-md"
          >
            <HIcon className="h-4" />
            {headingOptionOpen ? (
              <ChevronUp className="h-4" />
            ) : (
              <ChevronDown className="h-4" />
            )}
          </button>
          {headingOptionOpen && (
            <div className="absolute top-full mt-1 flex gap-2 z-20 bg-white border rounded shadow-lg p-1">
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 1 })
                    ? "is-active"
                    : "not-active"
                }
              >
                <Heading1 className="h-4" />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive("heading", { level: 2 })
                    ? "is-active"
                    : "not-active"
                }
              >
                <Heading2 className="h-4" />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                  editor.isActive("heading", { level: 3 })
                    ? "is-active"
                    : "not-active"
                }
              >
                <Heading3 className="h-4" />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                className={
                  editor.isActive("heading", { level: 4 })
                    ? "is-active"
                    : "not-active"
                }
              >
                <Heading4 className="h-4" />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
                className={
                  editor.isActive("heading", { level: 5 })
                    ? "is-active"
                    : "not-active"
                }
              >
                <Heading5 className="h-4" />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 6 }).run()
                }
                className={
                  editor.isActive("heading", { level: 6 })
                    ? "is-active"
                    : "not-active"
                }
              >
                <Heading6 className="h-4" />
              </button>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={handleFontSizeOptions}
            className="flex p-1 border rounded-md"
          >
            <ALargeSmall className="h-4" />
            {fontSizeOpen ? (
              <ChevronUp className="h-4" />
            ) : (
              <ChevronDown className="h-4" />
            )}
          </button>
          {fontSizeOpen && (
            <div className="absolute top-full z-10 mt-1 flex gap-2 bg-white border rounded shadow-lg p-1">
              {fontSizeArray.map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`p-1 ${
                    editor.isActive("textStyle", { fontSize: `${size}px` })
                      ? "bg-gray-200"
                      : ""
                  }`}
                >
                  {size}
                </button>
              ))}
              <button onClick={unSetFontSize} className="p-1 text-red-500">
                <X className="h-4" />
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1 ${
            editor.isActive("orderedList") ? "bg-gray-200" : ""
          }`}
        >
          <ListOrdered className="h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 ${
            editor.isActive("bulletList") ? "bg-gray-200" : ""
          }`}
        >
          <LIIcon className="h-4" />
        </button>
        <button
          onClick={setLink}
          className={`p-1 ${editor.isActive("link") ? "bg-gray-200" : ""}`}
        >
          <Link2 className="h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          className="p-1 text-red-500"
        >
          <Link2Off className="h-4" />
        </button>
        <button
          onClick={handleMarkerOpen}
          className="flex p-1 border rounded-md"
        >
          <Highlighter className="h-4" />
          {markerOpen ? (
            <ChevronUp className="h-4" />
          ) : (
            <ChevronDown className="h-4" />
          )}
        </button>
        {markerOpen && (
          <div className="absolute top-full z-10 mt-1 flex gap-2 bg-white border rounded shadow-lg p-1">
            {[
              "#fb923c",
              "#fbbf24",
              "#f87171",
              "#facc15",
              "#a3e635",
              "#4ade80",
              "#38bdf8",
              "#60a5fa",
            ].map((color) => (
              <button
                key={color}
                onClick={() =>
                  editor.chain().focus().toggleHighlight({ color }).run()
                }
                className={`px-1 rounded-md transition-colors ${
                  editor.isActive("highlight", { color })
                    ? "bg-gray-200"
                    : "hover:bg-gray-300"
                }`}
                aria-label={`Highlight with color ${color}`}
              >
                <Square fill={color} className={`h-4 md:h-8`} />
              </button>
            ))}
            <button
              onClick={() => editor.chain().focus().unsetHighlight().run()}
              className="p-1 text-red-500"
            >
              <X className="h-4" />
            </button>
          </div>
        )}
      </div>
      {/* )} */}
      <div className="w-full">
        <EditorContent editor={editor} className="overflow-y-auto" />
      </div>
    </div>
  );
};

export default Tiptap;
