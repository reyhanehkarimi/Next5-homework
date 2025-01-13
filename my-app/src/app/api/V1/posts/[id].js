let posts = [
  { id: 1, title: "Post 1", content: "Content of post 1" },
  { id: 2, title: "Post 2", content: "Content of post 2" },
];

export default function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  const postIndex = posts.findIndex((p) => p.id === parseInt(id));

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post Not Found!" });
  }

  if (method === "GET") {
    res.status(200).json(posts[postIndex]);
  } else if (method === "PATCH") {
    posts[postIndex] = { ...posts[postIndex], ...req.body };
    res.status(200).json(posts[postIndex]);
  } else if (method === "DELETE") {
    posts.splice(postIndex, 1);
    res.status(200).json({ message: "Post deleted successfully!" })
  } else {
    res.status(405).json({ message: "Method Not allowed!" })
  }
}
