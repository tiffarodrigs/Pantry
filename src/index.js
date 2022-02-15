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
    $("datalist#all-ingredients").append(`<option>${response.meals[i].strIngredient.toLowerCase()}</option>`);
    ingredients.push(response.meals[i].strIngredient.toLowerCase());
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
  makeApiCall();
  showIngredients();
});

$("#top").click(function () {
  $("html, body").animate({ scrollTop:0 }, "slow");
});

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

$("form#ingredientsInput").submit(function (event) {
  event.preventDefault();
  let ingredient = $("input#ingredient").val().toLowerCase();

  if (!ingredients.includes(ingredient)) {
    $(".showError").html("Sorry, this item is not an ingredient. Please, choose from the suggestions");
  } else if (list.includes(ingredient)) {
    $(".showError").html("Sorry, you already have this item on the list");
  } else {
    if (ingredientsCat.proteins.includes(ingredient) || ingredientsCat.vegetables.includes(ingredient) || ingredientsCat.spices.includes(ingredient) || ingredientsCat.fruits.includes(ingredient) || ingredientsCat.dairy.includes(ingredient) || ingredientsCat.other.includes(ingredient)) {
      $(`#${ingredient}`).addClass("selected");
      console.log("inside if " + list);
    } else {
      ingredientsCat.other.push(ingredient);
      $("#other").append(`<li id="${removeSpace(ingredient)}">${ingredient}</li>`);
      $(`#${removeSpace(ingredient)}`).addClass("selected");
    }
    list.push(ingredient);
    updateList();
    console.log("inside on " + list);
  }
});
