export default class Ingredient {
  constructor() {
    this.proteins = ["chicken", "beef", "pork", "turkey", "salmon"];
    this.vegetables = ["onion", "tomato", "carrot", "radish", "cauliflower"];
    this.spices = ["cinnamon", "paprika", "nutmeg", "cumin", "chilli", "corriander"];
    this.dairy = ["milk", "egg", "cheese"];
    this.fruits = ["apple", "orange", "banana"];
    this.other = [];
  }

  static async getIngredients() {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
      if (!response.ok) {
        console.log("apierror");
        throw Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }
}
