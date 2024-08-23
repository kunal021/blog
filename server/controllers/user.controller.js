import Post from "../schemas/post.schema.js";
import User from "../schemas/user.schema.js";

export const getUserPosts = async (req, res) => {
  const { page = "", limit = "", search = "" } = req.query;
  const userId = req.userId;
  const searchTerm = search.trim();
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let posts;
    let searchFilter = {};
    if (searchTerm) {
      searchFilter = {
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          // { content: { $regex: searchTerm, $options: "i" } },
        ],
      };
    }
    const filter = {
      $and: [{ author: user._id }, searchFilter],
    };
    const totalPosts = await Post.countDocuments(filter);

    if (!page || !limit) {
      posts = await Post.find(filter).sort({ createdAt: -1 });
    } else {
      page = Math.max(1, parseInt(page));
      limit = Math.max(1, parseInt(limit));

      posts = await Post.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    }

    if (!posts || posts.length === 0)
      return res.status(404).json({ error: "Posts not found" });

    res.json({
      data: posts,
      meta: {
        totalPosts,
        currPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        limit,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
