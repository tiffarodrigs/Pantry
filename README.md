# Pantry

#### Choose ingredients you have in your pantry, get a list of recipes you can make with selected ingredients.

#### By Daniel Lindsey, Hayley McVay, Anastasiia Riabets, Tiffany Rodrigo, and Jake Haley

## Technologies Used

- _HTML_
- _CSS_
- _JavaScript_
- _Markdown_
- _jQuery_
- _Bootstrap_
- _Popper.js_
- _Webpack_
- _ESLint_
- _Babel_
- _Rest API_
- _Tasty API_

## Description

Choose ingredients you have in your pantry. Our application also uses the Rest API to populate some ingredients for you to choose if you'd like, or you can search for ingredients not already listed. When an ingredient is selected the Tasty API will be called and it will return recipes using ingredients you've selected. Pantry app also sorts recipe results based on recipes that include the most amount of ingredients you've selected.

## Setup/Installation Requirements

- Clone the Repository
- Run `$ npm install` in root directory
- Retrieve API key from Tasty API. Go to https://rapidapi.com. Sign up for an account. Once you sign up search for the Tasty API(make sure not to select Tasty World). Once their click "Subscribe to Test" then choose your subscription payment level.
- You don't need an API key from themealdb.com.
- Create a `.env` file in the root directory that looks like this:
  ```
  API_KEY = <your API key here>
  ```
- Run `$ npm run start` in terminal to create live server

## Known Bugs

- Certain ingredients such as "Clove", "Butter", "Cumin" do not return results.
- If you click anywhere in line with the X on recipe sidebar, it closes the sidebar
- When you only input 1 ingredient "beef", recipes containing both "beef" & "beef stock" say: "you have 2 out of \_\_\_ ingredients" even though you technically only have 1
- Page sizing doesn't always work as intended. (Certain sections bleed over into other sections of the page)
- Let us know if you find anymore!

## License

[ISC](https://opensource.org/licenses/ISC)

## Contact Information

Tiffany Rodrigo 
tiffa.rodrigs@gmail.com
