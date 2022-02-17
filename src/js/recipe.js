export default class Recipe {
  constructor(name, img, instructions, id, sections, userCount, recipeCount) {
    this.name = name;
    this.img = img;
    this.instructions = instructions;
    this.id = id;
    this.sections = sections;
    this.userCount = userCount;
    this.recipeCount = recipeCount;
  }

  static getRecipe(ingredients) {
    return fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=50&tags=under_30_minutes&q=${ingredients}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "tasty.p.rapidapi.com",
        "x-rapidapi-key": `${process.env.API_KEY}`,
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
  }
}
