## UX
In this project I receive my data from newsapi.org and the overall functionality of the website is based on this data. Newsapi.org is an API that provides access to various news platforms. I wanted to create a web app for someone that I know who is a journalism student and therefore has a requirement to read various types of articles from various news sources.
### Design
For the design process of this web app I got some ideas from some websites that I had recently visited. I made a mock up design based on these websites and the elements that I liked and thought might work visually. Mock up with sources can be found at: https://github.com/Garathd/milestone-project-2/blob/master/mockups/Mock-Up.png
### API
I also made a document of some API Requests and Responses: https://github.com/Garathd/milestone-project-2/blob/master/documents/News%20API%20Document.docx?raw=true
### User Requirements
- As a user I want to be able to search for articles from certain countries
- As a user I want to be able to search from various News Sources
- As a user I want to be able to type in my own search terms
- As a user I want to be able to search by categories
- As a user I want to be able to search by languages

## Features

### Homepage (Top Headlines)
- The ability to search by country
- The ability to search by category
- The ability to search by sources
- The ability to search by search parameters
- The ability to use pagination

### Advanced Search Page
- The ability to search by sources
- The ability to search by languages
- The ability to search by the Most Popular, the Most Recent and the Most Relevant. 
- The ability to search by search parameters
- The ability to use pagination

## Features left to implement
Search from specific dates in the advanced search. A 404 page or at least a redirect back to the home page with a: .htaccess file. I would like to eventually turn this into a one page application and use some type of routing for state changes and also use partials to further improve the code.

## Technologies Used

This Web App uses JavaScript, HTML 5, SASS, JQuery, Bootstrap 3, Bootstrap Material Design, Moment JS, Font Awesome and Gulp.
My gulp file basically consists of gulp-concat, gulp-minify, gulp-sequence and gulp-sass which were installed via node. I have set up a main task called “gulp scripts” that concatenates and minifies my JS into 2 separate files for both the Search Page and the Home Page which is to be used on the production version of my Web App. I also have Sass set up on a watch for any CSS changes. 
I’m using moment JS to convert the article date formats. I’m using font awesome for my previous and next buttons and scroll to top
 
## Testing
This web app was tested using Firefox and a Galaxy S5 and was tested both manually and using Jasmine Unit Testing
The Unit tests can be run by uncommenting the testing code in the index.html and advanced.html pages header section in the devlop branch of thiw web app.

I needed to include validation on the search fields to only allow alphanumeric entry as I noticed when I typed and searched &&& it changed the API url. 

### Homepage Tests

#### Manual Tests
- ***Test case 1:*** Search by just countries 
- ***Test case 2:*** Search by countries and category
- ***Test case 3:*** Search by countries and category with a search parameter
- ***Test case 4:*** Search by All Countries, All Categories and All Sources
- ***Test case 5:*** Modal message if you try and search for Sources with either countries and categories or both. 
- ***Test case 6:*** In the event of a multiple sources being selected with no sources checked the page reloads.  

#### Unit Test with Jasmine
- ***Test case 1:*** Check if the response is ok
- ***Test case 2:*** Check if any articles are found
- ***Test case 3:*** Check if the countries, categories and languages and sort by menu options are working
- ***Test case 4:*** Check if the sources menu option is found (publishers)

### Advanced Page Tests

#### Manual Tests
- ***Test Case One:*** Just search by language gives modal message to for the user to “Choose at least a Source or use the Search”. 
- ***Test Case Two:*** Just using the sort by select box gives modal message to for the user to “Choose at least a Source or use the Search”. 
- ***Test Case Three:*** Search with all of the following - with source, with search by language with sort by and with a search term.
- ***Test Case Four:***  Search with all sources, all languages, most popular and with a search parameter

#### Unit Test with Jasmine
- ***Test case 1:*** Check if the response is ok
- ***Test case 2:*** Check if any articles are found
- ***Test case 3:*** Check if the countries, categories and languages and sort by menu options are working
- ***Test case 4:*** Check if the sources menu option is found (publishers)

## Deployment
During development, all code was written in Cloud 9 and updates were saved and tested locally. Throughout the process I used GitHub to keep track of changes and to maintain version control in my code base. 

The Development version of my website is a separate branch than my live version it is called develop. The main difference between these branches is that the code for unit testing is uncommented along with the un-concatenated and un-minified JavaScript files while the production code is uncommented. This branch is used for testing and development and satisfactory changes are then merged into the live master branch.

The Master branch of this website is the production branch for my live GitHub pages version of my website with only essential code available.

Once project development was completed I deployed the project to GitHub pages by taking the following steps:
- Make the final commit to the repo
- Click settings
- Scroll to GitHub Pages section
- Select the master branch as the source
- Save changes and test

A live version of the project is available on GitHub pages at https://garathd.github.io/milestone-project-2/

## Content and Media
All my content is sourced from the various media publishers that are available via the newsapi.org API. I have set up a placeholder image if there is no image coming back for a particular article. If there is an image set but not found it displays the article title in the alt attribute. 

## Acknowledgements
I received inspiration for this website from:
- ***RTE.ie***  - Black Navigation bar
- ***RT.com*** – I liked the green on black mix. My search button is green
- ***Aerlingus.com*** – For select fields and search styles
- ***Cloud 9*** – Black navigation bar with grey header and also navigation button styles
- ***Code Institute*** – The pagination buttons


