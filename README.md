# TheMovieDB Explorer
## _"To infinity and beyond!"_
Welcome to TheMovieDB Explorer, a web application that allows users to discover and explore a vast collection of movies and TV shows. This app leverages the TheMovieDB API to provide up-to-date information on popular, trending, and top-rated movies and series.

![Homepage readme.gif](src%2Fassets%2FHomepage%20readme.gif)

## Features
- Search Movies and TV Shows: Users can search for their favorite movies and TV series using keywords and receive detailed information.
- Watch Trailers: Watch trailers for movies and series directly from YouTube, integrated seamlessly into the platform.
- User Authentication: Registered users can log in, favorite / rate movies or series and share their favorites with others via social media (Facebook, WhatsApp).
- Favorites: Logged-in users can add movies or TV shows to their personal favorites list for easy access later.
- Responsive Design: The site is fully responsive, providing a smooth user experience across desktop, tablet, and mobile devices.

## Technologies Used
- Frontend: React.js for the user interface and interaction.
- Authentication management with custom backend integration, and Axios for making API requests.
- TMDB API: TheMovieDB API (The Movie Database) for fetching detailed information about movies and TV shows.
- YouTube API: For embedding trailers of the movies and TV shows directly into the interface.
- CSS: Custom styling with CSS to create a sleek and modern user interface.

## Installation Guide
### Requirements
- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/) 

### Setup Instructions
1. Clone the repository:
```
git@github.com:The23nd/eindopdracht-armend.git
```
2. Install dependencies:
```
npm install
```
3. Create a .env file in the root directory and add your TheMovieDB API key:
```
VITE_API_KEY=your_api_key_here
```
4. Run the development server:
```
npm run dev
```
5. Open http://localhost:5173/ in your browser to start exploring!




