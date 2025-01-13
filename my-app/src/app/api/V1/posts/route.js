let posts = [
  { id: 1, title: "Post 1", content: "Content of post 1" },
  { id: 2, title: "Post 2", content: "Content of post 2" },
];

export default function handler(req, res) {
    const { method } = req;

    if(method === "GET") {
      res.status(200).json(posts);
    } else if (method === "POST") {
        const newPost = req.body;
        newPost.id = posts.length + 1;
        posts.push(newPost);
        res.status(201).json(newPost);
    } else {
        res.status(405).json({ message: "Method not allowed!" })
    }
}







  
