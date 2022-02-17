export default class Ingredient {
  constructor() {
    this.proteins = ["chicken", "beef", "pork", "turkey", "salmon", "tofu"];
    this.vegetables = ["onion", "tomato", "carrot", "radish", "cauliflower", "peppers"];
    this.spices = ["cinnamon", "paprika", "nutmeg", "cumin", "chilli", "coriander"];
    this.dairy = ["milk", "egg", "cheese", "yogurt", "butter", "cream"];
    this.fruits = ["apple", "orange", "banana","mango","pineapple","strawberries"];
  }

  static async getIngredients() {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }
}
