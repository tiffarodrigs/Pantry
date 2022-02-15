export default class RecipeList {
  constructor() {
    this.recipes = {};
  }

  addRecipe(recipe) {
    this.recipes[recipe.id] = recipe;
  }

  findRecipe(id) {
    console.log("inside find recipe", this.recipes);
    if (this.recipes[id] != undefined) {
      return this.recipes[id];
    }
    return false;
  }
}
