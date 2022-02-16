export default class RecipeList {
  constructor() {
    this.recipes = {};
  }

  addRecipe(recipe) {
    this.recipes[recipe.id] = recipe;
  }

  findRecipe(id) {
    if (this.recipes[id] != undefined) {
      return this.recipes[id];
    }
    return false;
  }
}
