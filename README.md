# Airline Manager
This application was made as a training project under Skillstorm.

The Airline Manager allows the user to manage plane flights for an airline. They can add, edit, or delete flights. They are organized into a table on the View Flights page. This application is created using React, Bootstrap & React-Bootstrap as the CSS framework, and MongoDB as the database. The servers are run via express. The MongoDB database contains three collections. Their contents and relationships are in the image below.

[flightcollectiondiagram](./flightcollectionsdiagram.png)

The Airports collection allows us to have a dropdown menu of airport names during flight creation/editing. The same goes for the Planes collection, except that this collection also includes a field for the plane's passenger capacity.

The github repository is located [here](https://github.com/JBurgos93/Airlines).
![flightcollectionsdiagram](https://user-images.githubusercontent.com/107504697/178040033-0383d7b0-b8d4-480f-8b82-6aea8cdf6be1.png)

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributors](#contributors)
* [Questions](#questions)

## Installation
After cloning the repository to your machine, be sure to run 'npm i' or 'npm install' to install all of the needed dependencies. Next, you need a .env file. Inside you may specify the PORT that the database will run on (defaults to 8080). You need to specify your MONGO_URI so that you can connect to your own MongoDB account database. Afterwords, run 'npm start' to launch it. Port 8080 will be used for the Mongoose server, and port 3000 will be used for the Airline Manager application. The page should automatically load up in your default browser. Otherwise, you may access it at 'http://localhost:3000'.

## Usage
The landing page of the application the table view. If the database's Flights collection already has documents, then the table will be populated with all of the flights. The add button on the side will bring up a modal that allows you to input the information needed for creating a flight. All of the fields must be filled. There are checks in place to prevent bad inputs. There are also checks to make sure of the following:
    - arrivals don't happen before departures
    - arrival and departure airports aren't the same
    - flight number is a positive integer and not the same as another flight's
    - passenger count is a non-negative integer and not greater than the passenger capacity

Passenger capacity is also not editable as that is tied to the capacity of the plane and is updated automatically when the plane model is selected.
On the table page, there are a scissor and pencil button next to the flight numbers in each row. The sciossor will delete that row, while the pencil will bring up a modal to edit that flight's information. The rules on the edit modal are the same as the add flight modal.

## License
MIT License

Copyright (c) 2022 Jose David Burgos

## Contributors
    Jose David Burgos ---- JBurgos93

## Questions
Find me on [my github](https://github.com/JBurgos93/).
