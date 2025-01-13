let recipes = [
    { id: 1, name: "Recipe 1", ingredients: "Ingredients of recipe 1" },
    { id: 2, name: "Recipe 2", ingredients: "Ingredients of recipe 2" },
  ];



  export default function handler(req,res) {
    const { method } = req;
    const { id } = req.query;

   const recipeIndex = recipes.findIndex((r) => r.id === parseInt(id));

   if (recipeIndex === -1) {
    return res.status(404).json({ message: "Recipe Not Found!" })
   }

   if (method === "GET") {
    res.status(200).json(recipes[recipeIndex])
   } else if (method === "PATCH") {
    recipes[recipeIndex] = { ...recipes[recipeIndex], ...req.body };
    res.status(200).json(recipes[recipeIndex])
   } else if (method === "DELETE") {
    recipes.splice(recipeIndex, 1);
    res.status(200).json({ message: "Recipe Deleted Successfully!" })
   } else {
    res.status(405).json({ message: "Method Not Allowed!" })
   }
  }