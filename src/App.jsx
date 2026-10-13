import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState([]);
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch(
          "https://api.freeapi.app/api/v1/public/meals?page=1&limit=20",
        );
        if (!res.ok) {
          throw new Error("failed to fetch recipes");
        }
        const result = await res.json();
        console.log(result.data.data);
        setRecipes(result.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchRecipes();
  }, []);
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.strMeal.toLowerCase().includes(search.toLowerCase()),
  );
  const saveRecipe = (recipe) => {
    setSaved((prev) => [...prev, recipe.idMeal]);
  };
  return (
    <div className="bg-orange-100 px-10 py-10">
      <h1 className="ml-20 font-bold text-3xl text-orange-600">
        Recipe Finder
      </h1>
      <div className="max-w-5xl mx-auto border rounded-lg p-2 bg-white border-orange-400 shadow-lg m-4">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none"
        />
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-orange-100">
        {filteredRecipes.length === 0 ? (
          <p>No recipes match your search.</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="border rounded-2xl flex flex-col shadow-lg border-white bg-white  overflow-hidden w-full h-70"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-85 h-40 object-cover rounded-lg mb-2"
              />
              <h1 className="text-xl font-bold ml-2">{recipe.strMeal}</h1>
              <p className="ml-2">
                {recipe.strCategory}
                <span> .{recipe.strArea}</span>
              </p>

              <button
                onClick={() => saveRecipe(recipe)}
                className={`m-2 w-30 rounded-lg border border-orange-500 p-2 text-center ${
                  saved.includes(recipe.idMeal) ? "bg-orange-600" : "bg-white"
                }`}
              >
                {saved.includes(recipe.idMeal) ? "Saved" : "Save"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
