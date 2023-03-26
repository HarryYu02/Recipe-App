# Let'em Cook

Let'em Cook is a full-stack recipe sharing application that enables users to share their favorite recipes, browse others' recipes, create meal plans, and generate grocery lists. Built with TypeScript and Refine framework, Let'em Cook is a great example of a modern, performant, and scalable MERN stack application.

You can visit the deployed version of Let'em Cook at [https://letem-cook.netlify.app](https://letem-cook.netlify.app/). Please note that the backend of the application is hosted on render.com's free tier, which shuts down when not in use. As a result, the application might take a few minutes to activate if it hasn't been used in a while.

## Features

Let'em Cook offers a variety of features, including:

-   Responsive design: The app is optimized for different screen sizes, so it can be used on both desktop and mobile devices.
-   Recipe sharing: Users can create, read, update, and delete their own recipes, as well as view and save recipes created by other users.
-   Browse all recipes: Users can browse all recipes in the database, and filter and paginate the results.
-   Save recipes: Users can save recipes for future reference, and easily access them from their profile page.
-   Meal plan: Users can create a meal plan by adding recipes from their saved recipes, and view their plan on a calendar.
-   Shopping list: Users can generate a grocery list based on their meal plan, to help them plan their shopping more efficiently.

### Screenshots

Here are a few screenshots of the Let'em Cook app in action:

#### Login page

![login](https://user-images.githubusercontent.com/73459064/226227457-8e5f0202-6fac-4d30-8ecc-e8caf1348001.jpg)

#### All recipes page

![all-recipes](https://user-images.githubusercontent.com/73459064/226227295-5fe1fb70-c899-4539-9ceb-3bb651187bf2.jpg)

#### Recipe details page

![recipe-details](https://user-images.githubusercontent.com/73459064/226227327-a67a4e65-f0bd-4693-8e2e-5ba597182ab4.jpg)

#### Saved recipes page

![saved](https://user-images.githubusercontent.com/73459064/226227421-18aef499-61b5-4b6f-ac42-f336a4e760b3.jpg)

#### Meal plan page

![meal-plan](https://user-images.githubusercontent.com/73459064/226227337-e75143b6-5ec8-4a7e-bdd0-9c8f338c6fa9.jpg)

#### Shopping list page

![shopping-list](https://user-images.githubusercontent.com/73459064/226227535-69307000-3366-4743-a810-019da06d175f.jpg)

#### Profile page

![profile](https://user-images.githubusercontent.com/73459064/226227365-7396ce23-973b-41f1-9e54-d2ad234fdf4e.jpg)

## Technologies Used

Let'em Cook leverages a number of technologies to create a seamless user experience. Some of the primary tools and technologies used include:

### Frontend

-   [TypeScript](https://www.typescriptlang.org/) - a strongly typed programming language that builds on JavaScript by adding optional static types.
-   [React](https://reactjs.org/) - a popular JavaScript library for building user interfaces.
-   [Refine](https://github.com/refinedev/refine) - a powerful headless web-app framework for building scalable, flexible, and easy-to-maintain applications.
-   [Material UI](https://mui.com/) - a popular UI framework for React-based applications that offers a variety of customizable components.
-   [React Query](https://react-query.tanstack.com/) - a library that provides tools for fetching, caching, and updating asynchronous data in React-based applications.
-   [React Hook Form](https://react-hook-form.com/) - a library for managing form inputs in React-based applications.
-   [Google Auth](https://developers.google.com/identity) - a secure and easy-to-use authentication and authorization service for web applications.
-   [Netlify](https://www.netlify.com/) - a cloud-based platform that provides a variety of services for building, deploying, and managing web applications.

### Backend

-   [Node.js](https://nodejs.org/) - a popular runtime environment for building server-side applications in JavaScript.
-   [Express](https://expressjs.com/) - a lightweight and flexible web application framework for Node.js.
-   [MongoDB](https://www.mongodb.com/) - a popular NoSQL database used for building scalable and flexible applications.
-   [Mongoose](https://mongoosejs.com/) - a powerful object modeling library for MongoDB in Node.js.
-   [Cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) - a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
-   [Cloudinary](https://cloudinary.com/) - a cloud-based image and video management service that offers a variety of features, including storage, manipulation, optimization, and delivery.
-   [Render](https://render.com/) - a cloud platform for building and hosting modern applications.

## Getting Started

If you want to run it on your local machine, please follow the steps below. 

### Prerequisites

-   [Node.js](https://nodejs.org/en/) v14 or higher installed on your machine

### Installation

1.  Clone the repository

	`git clone https://github.com/HarryYu02/Recipe-App.git` 

2.  Install frontend dependencies

	`cd client`  
	`npm install` 

3.  Install backend dependencies

	`cd ../server`  
	`npm install` 

4.  Set up environment variables
	-   Create a `.env` file in the backend directory with the following variables:

		`MONGODB_URI=<your-mongodb-uri>`  
		`CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>`  
		`CLOUDINARY_API_KEY=<your-cloudinary-api-key>`  
		`CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>`   
		`PORT=8080<or-port-of-your-choice>`

	-   Create a `.env.local` file in the frontend directory with the following variables:

		`REACT_APP_GOOGLE_CLIENT_ID=<your-google-client-id>` 
5.  Change the base url in /client/src/App.tsx
    -  Search and modify all instances of https://letem-cook-backend.onrender.com to your localhost, for example, http://localhost:8080

6.  Start the backend server

	`cd server`  
	`npm run start` 

7.  Start the frontend server

	`cd ../client`  
	`npm run dev` 

8.  Open [http://localhost:3000](http://localhost:3000/) in your browser to see the app

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

-   Email: [yupakhei456@gmail.com](mailto:youremail@example.com)
-   GitHub: [https://github.com/HarryYu02](https://github.com/%7Busername%7D)
