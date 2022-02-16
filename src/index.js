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
    $("#loading").hide();
    for (let i = 0; i < recipes.length; i++) {
      const recipeName = recipes[i].name;
      const imgCode = recipes[i].thumbnail_url;
      const instructions = recipes[i].instructions;
      const ingredientsSections = recipes[i].sections;
      let sections = [];
      for (let i = 0; i < ingredientsSections.length; i++) {
        let ingredients = [];
        ingredientsSections[i].components.forEach(function(ingredient) {
          ingredients.push(ingredient.raw_text);
        });
        if (ingredientsSections[i].name === null) {
          sections.push(["Ingredients", ingredients]);
        } else {
          sections.push([ingredientsSections[i].name, ingredients]);
        }
      }
      let recipe = new Recipe(recipeName, imgCode, instructions, i, sections); 
      recipeList.addRecipe(recipe);
      let outputStr = `<li id="${i}">
            <div class="card recipe-cards">
              <div class="card-body">
                <div class="card-title-img">
                  <img src="${imgCode}" id="recipe-img" alt="img of recipe">
                  <br>
                  <h5 class="heading-5">${recipeName}</h4>
                </div>
              </div>
            </li>`;
      $("ul#fetched-recipe").append(outputStr);
    }
  } else {
    $(".showErrors").text(`There was an error: ${response}`);
  }
}

$("ul#fetched-recipe").on("click", "li", function () {
  let recipe = recipeList.findRecipe(this.id);

  $("#recipe-sidebar").show();

 
  $("#ingredients-section").empty();

  $("#name").html(recipe.name);
  $("#recipe-detail-img").attr("src", recipe.img);
  $("#instructions").empty();
  for (let i = 0; i < recipe.instructions.length; i++) {
    $("#instructions").append(`<li>${recipe.instructions[i].display_text}</li>`);
  }
  console.log(recipe.sections);
  for (let i = 0; i < recipe.sections.length; i++) {
    $("#ingredients-section").append(`<h3>${recipe.sections[i][0]}</h3>`);
    let ingredients = recipe.sections[i][1];
    for ( let j =0; j<ingredients.length; j++) {
      $("#ingredients-section").append(`<p>${ingredients[j]}</p>`);
    }
  }
});

function removeSpace(word) {
  word = word.replace(" ", "-");
  return word;
}

function updateList() {
  $("ul#ingredients-list").empty();
  for (let i = 0; i < list.length; i++) {
    $("ul#ingredients-list").append(`<li>${list[i]}</li>`);
    // if (i > 1 && i % 3 === 0) {
    //   $("ul#ingredients-list").append(`<br><br>`);
    // }
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

$("ul.category").on("click", "li", function () {
  $(this).toggleClass("list-group-item-success");
  if (!$(this).hasClass("list-group-item-success")) {
    let index = list.indexOf($(this).attr("id"));
    list.splice(index, 1);
    updateList();
  } else {
    list.push($(this).attr("id"));
    updateList();
  }
  
  $("ul#fetched-recipe").empty();
  $("#loading").show();
  makeApiCallRecipe();
});

$("#top").click(function () {
  $("html, body").animate({ scrollTop: 0 }, "fast");
});

$("form#ingredientsInput").submit(function (event) {
  event.preventDefault();
  let ingredient = $("input#ingredient").val().toLowerCase();
  if (!ingredients.includes(ingredient)) {
    console.log("not found in list");
    $(".showError").html("Sorry, this item is not an ingredient. Please, choose from the suggestions");
    $(".showError").slideDown(500, function() {
      $(".showError").slideUp(2000, function() {
        $(".showError").empty();
      });       
    });
    
    
  } else if (list.includes(ingredient)) {
    $(".showError").html("Sorry, you already have this item on the list");
  } else {
    if (ingredientsCat.proteins.includes(ingredient) || ingredientsCat.vegetables.includes(ingredient) || ingredientsCat.spices.includes(ingredient) || ingredientsCat.fruits.includes(ingredient) || ingredientsCat.dairy.includes(ingredient) || ingredientsCat.other.includes(ingredient)) {
      $(`#${ingredient}`).addClass("list-group-item-success");
    } else {
      ingredientsCat.other.push(ingredient);
      $("#other").append(`<li class="list-group-item" id="${removeSpace(ingredient)}">${ingredient}</li>`);
      $(`#${removeSpace(ingredient)}`).addClass("list-group-item-success");
    }
    list.push(ingredient);
    updateList();
    $("ul#fetched-recipe").empty();
    $("#loading").show();
    makeApiCallRecipe();
  }
});

$("#searchRecipes").click(function () {
  $("ul#recipe-list").empty();
  makeApiCallRecipe();
});
$("#close").click(function(){
  $("#recipe-sidebar").hide();
});
