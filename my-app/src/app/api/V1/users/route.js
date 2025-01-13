let users = [
    { id: 1, name: "User 1", email: "user1@example.com" },
    { id: 2, name: "User 2", email: "user2@example.com" },
  ];

  
  export default function handler(req,res) {
    const { method } = req;

    if (method === "GET") {
        res.status(200).json(users);
    } else if (method === "POST") {
         const newUser = req.body;
         newUser.id = users.length + 1;
         users.push(newUser);
         res.status(201).json(newUser);
    } else {
        res.status(405).json({ message: "Method not allowed" })
    }
  }