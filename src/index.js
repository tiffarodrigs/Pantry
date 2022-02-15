import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Ingredient from "./js/ingredients.js";
import Recipe from "./js/recipe.js";
import RecipeList from "./js/recipeList.js";

let ingredients = [];
let ingredientsCat = new Ingredient();
let list = [];
let recipeList = new RecipeList();

async function makeApiCallIngr() {
  const response = await Ingredient.getIngredients();
  getIngredients(response);
}

async function makeApiCallRecipe() {
  let listString = list.join(",");
  const response = await Recipe.getRecipe(listString);
  getRecipes(response);
}

function getIngredients(response) {
  for (let i = 0; i < response.meals.length; i++) {
    $("datalist#all-ingredients").append(`<option>${response.meals[i].strIngredient.toLowerCase()}</option>`);
    ingredients.push(response.meals[i].strIngredient.toLowerCase());
  }
}

function getRecipes(response) {
  if (response) {
    const recipes = response.results;
    for (let i = 0; i < recipes.length; i++) {
      const recipeName = recipes[i].name;
      const imgCode = recipes[i].thumbnail_url;
      const instructions = recipes[i].instructions;
      let recipe = new Recipe(recipeName, imgCode, instructions, i);
      recipeList.addRecipe(recipe);
      $("ul#recipe-list").append(`<li id="${i}"><span class="recipe-name">${recipeName}</span><img class="list-img"src=${imgCode}></li>`);
    }
    console.log(recipeList);
  } else {
    console.log("error");
    $(".showErrors").text(`There was an error: ${response}`);
  }
}

function showIngredients() {
  for (let i = 0; i < ingredientsCat.proteins.length; i++) {
    $("ul#proteins").append(`<li class="list-group-item ingredients-inline" id="${removeSpace(ingredientsCat.proteins[i])}">${ingredientsCat.proteins[i]}</li>`);
    if (i > 1 && i % 3 === 0) {
      $("ul#proteins").append(`<br><br>`);
    }
  }
  for (let i = 0; i < ingredientsCat.vegetables.length; i++) {
    $("#vegetables").append(`<li class="list-group-item ingredients-inline" id="${removeSpace(ingredientsCat.vegetables[i])}">${ingredientsCat.vegetables[i]}</li>`);
    if (i > 1 && i % 3 === 0) {
      $("ul#vegetables").append(`<br><br>`);
    }
  }
  for (let i = 0; i < ingredientsCat.spices.length; i++) {
    $("#spices").append(`<li class="list-group-item ingredients-inline" id="${removeSpace(ingredientsCat.spices[i])}">${ingredientsCat.spices[i]}</li>`);
    if (i > 1 && i % 3 === 0) {
      $("ul#spices").append(`<br><br>`);
    }
  }
  for (let i = 0; i < ingredientsCat.dairy.length; i++) {
    $("#dairy").append(`<li class="list-group-item ingredients-inline" id="${removeSpace(ingredientsCat.dairy[i])}">${ingredientsCat.dairy[i]}</li>`);
    if (i > 1 && i % 3 === 0) {
      $("ul#dairy").append(`<br><br>`);
    }
  }
  for (let i = 0; i < ingredientsCat.fruits.length; i++) {
    $("#fruits").append(`<li class="list-group-item ingredients-inline" id="${removeSpace(ingredientsCat.fruits[i])}">${ingredientsCat.fruits[i]}</li>`);
    if (i > 1 && i % 3 === 0) {
      $("ul#fruits").append(`<br><br>`);
    }
  }
}

$(document).ready(function () {
  makeApiCallIngr();
  showIngredients();
});

$("ul.fetched-recipe").on("click", "li", function () {
  console.log(this.id);
  let recipe = recipeList.findRecipe(this.id);
  console.log(recipe);
  $("#name").html(recipe.name);
  $("#recipe-img").attr("src", recipe.img);
  $("#instructions").empty();
  for (let i = 0; i < recipe.instructions.length; i++) {
    $("#instructions").append(`<li>${recipe.instructions[i].display_text}</li>`);
  }

$("ul.category").on("click", "li", function () {
  $(this).toggleClass("list-group-item-success");

  if (!$(this).hasClass("list-group-item-success")) {
    let index = list.indexOf($(this).attr("id"));
    list.splice(index, 1);
    updateList();
    console.log("after splice" + list);
  } else {
    list.push($(this).attr("id"));
    updateList();
  }
  console.log("inside on " + list);
});

function removeSpace(word) {
  word = word.replace(" ", "-");
  return word;
}

function updateList() {
  $("ul#ingredients-list").empty();
  for (let i = 0; i < list.length; i++) {
    $("ul#ingredients-list").append(`<li class="list-group-item list-group-item-light ingredients-inline">${list[i]}</li>`);
    if (i > 1 && i % 3 === 0) {
      $("ul#ingredients-list").append(`<br><br>`);
    }
  }
}

$("#top").click(function () {
  $("html, body").animate({ scrollTop: 0 }, "slow");
});

$("form#ingredientsInput").submit(function (event) {
  event.preventDefault();
  let ingredient = $("input#ingredient").val().toLowerCase();

  if (!ingredients.includes(ingredient)) {
    $(".showError").html("Sorry, this item is not an ingredient. Please, choose from the suggestions");
  } else if (list.includes(ingredient)) {
    $(".showError").html("Sorry, you already have this item on the list");
  } else {
    if (ingredientsCat.proteins.includes(ingredient) || ingredientsCat.vegetables.includes(ingredient) || ingredientsCat.spices.includes(ingredient) || ingredientsCat.fruits.includes(ingredient) || ingredientsCat.dairy.includes(ingredient) || ingredientsCat.other.includes(ingredient)) {
      $(`#${ingredient}`).addClass("list-group-item-success");
      console.log("inside if " + list);
    } else {
      ingredientsCat.other.push(ingredient);
      $("#other").append(`<li class="list-group-item" id="${removeSpace(ingredient)}">${ingredient}</li>`);
      $(`#${removeSpace(ingredient)}`).addClass("list-group-item-success");
    }
    list.push(ingredient);
    updateList();
    console.log("inside on " + list);
  }
});

$("#searchRecipes").click(function () {
  $("ul#recipe-list").empty();
  makeApiCallRecipe();
});
