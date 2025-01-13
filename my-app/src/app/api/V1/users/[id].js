let users = [
    { id: 1, name: "User 1", email: "user1@example.com" },
    { id: 2, name: "User 2", email: "user2@example.com" },
  ];


  export default function handler(req,res) {
    const { method } = req;
    const { id } = req.query;

    const userIndex = users.findIndex((u) => u.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found!" })
    }

    if (method === "GET") {
        res.status(200).json(users[userIndex])
    } else if(method === "PATCH"){
        users[userIndex] = {...users[userIndex], ...req.body};
        res.status(200).json(users[userIndex])
    } else if(method === "DELETE"){
        users.splice(userIndex, 1);
        res.status(200).json({ message: "User deleted Successfully!" })
    } else {
        res.status(405).json({ message: "Method Not Allowed" })
    }
  }