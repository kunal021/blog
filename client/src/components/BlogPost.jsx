/* eslint-disable react/prop-types */
import ReactMarkdown from "react-markdown";

const BlogPost = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  );
};

export default BlogPost;
