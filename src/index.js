import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Ingredient from "./js/ingredients.js";

let ingredients = [];
let ingredientsCat = new Ingredient();
let list = [];

async function makeApiCall() {
  const response = await Ingredient.getIngredients();
  getIngredients(response);
}

function getIngredients(response) {
  for (let i = 0; i < response.meals.length; i++) {
    $("datalist#ingredients").append(`<option>${response.meals[i].strIngredient.toLowerCase()}</option>`);
    ingredients.push(response.meals[i].strIngredient.toLowerCase());
  }
}

function showIngredients() {
  for (let i = 0; i < ingredientsCat.proteins.length; i++) {
    $("ul#proteins").append(`<li id="${removeSpace(ingredientsCat.proteins[i])}">${ingredientsCat.proteins[i]}</li>`);
  }
  for (let i = 0; i < ingredientsCat.vegetables.length; i++) {
    $("#vegetables").append(`<li id="${removeSpace(ingredientsCat.vegetables[i])}">${ingredientsCat.vegetables[i]}</li>`);
  }
  for (let i = 0; i < ingredientsCat.spices.length; i++) {
    $("#spices").append(`<li id="${removeSpace(ingredientsCat.spices[i])}">${ingredientsCat.spices[i]}</li>`);
  }
  for (let i = 0; i < ingredientsCat.dairy.length; i++) {
    $("#dairy").append(`<li id="${removeSpace(ingredientsCat.dairy[i])}">${ingredientsCat.dairy[i]}</li>`);
  }
  for (let i = 0; i < ingredientsCat.fruits.length; i++) {
    $("#fruits").append(`<li id="${removeSpace(ingredientsCat.fruits[i])}">${ingredientsCat.fruits[i]}</li>`);
  }
}

$(document).ready(function () {
  makeApiCall();
  showIngredients();
});

$("ul.category").on("click", "li", function () {
  $(this).toggleClass("selected");

  if (!$(this).hasClass("selected")) {
    let index = list.indexOf($(this).attr("id"));
    list.splice(index, 1);
    console.log("after splice" + list);
  } else {
    list.push($(this).attr("id"));
  }
  console.log("inside on " + list);
});

function removeSpace(word) {
  word = word.replace(" ", "-");
  return word;
}
$("#submit").click(function () {
  let ingredient = $("input#ingredient").val().toLowerCase();

  if (!ingredients.includes(ingredient)) {
    $(".showError").html("Sorry, this item is not an ingredient. Please, choose from the suggestions");
  } else if (list.includes(ingredient)) {
    $(".showError").html("Sorry, you already have this item on the list");
  } else {
    if (ingredientsCat.proteins.includes(ingredient) || ingredientsCat.vegetables.includes(ingredient) || ingredientsCat.spices.includes(ingredient) || ingredientsCat.fruits.includes(ingredient) || ingredientsCat.dairy.includes(ingredient)) {
      $(`#${ingredient}`).addClass("selected");
      console.log("inside if " + list);
    } else {
      $("#other").append(`<li id="${removeSpace(ingredient)}">${ingredient}</li>`);
      $(`#${removeSpace(ingredient)}`).addClass("selected");
    }
    list.push(ingredient);
    console.log("inside on " + list);
  }
});
