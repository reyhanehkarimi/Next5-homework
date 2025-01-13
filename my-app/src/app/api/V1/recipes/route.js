let recipes = [
    { id: 1, name: "Recipe 1", ingredients: "Ingredients of recipe 1" },
    { id: 2, name: "Recipe 2", ingredients: "Ingredients of recipe 2" },
  ];


  export default function handler(req,res) {
    const { method } = req;

    if (method === "GET") {
        res.status(200).json(recipes)
    } else if (method === "POST") {
        const newRecipes = req.body;
        newRecipes.id = recipes.length + 1;
        recipes.push(newRecipes);
        req.status(201).json(newRecipes);
    } else {
        res.status(405).json({ message: "Method Not Allowed!" })
    }
  }