# Furnitr Project

Furnitr is an app for buying and selling furniture. This love child of tindr and facebook marketplace lets you quickly and pleasantly swipe through various listings, save your favourites, post items to sell and DM the potential buyers or sellers.


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- body-parser 
- chalk
- cookie-session
- ejs
- express 
- faker
- moment
- morgan
- node-sass-middleware

## Screenshots

!["Furnitr Main Page"](https://github.com/Kaplane926/Furnitr/blob/master/docs/furnitr-main-page.png?raw=true)
!["Furnitr Messages"](https://github.com/Kaplane926/Furnitr/blob/master/docs/furnitr-messages.png?raw=true)
!["Create New Listing"](https://github.com/Kaplane926/Furnitr/blob/master/docs/furnitr-new-listing.png?raw=true)
