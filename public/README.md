
# Game Demo SubReadme
Some notes on running & future integration

![GitHub language count](https://img.shields.io/github/languages/count/gloriousLoaf/Emoji-Runner)
![GitHub top language](https://img.shields.io/github/languages/top/gloriousLoaf/Emoji-Runner)

## Table of Contents
* [Description](#-description)
* [Installation](#-installation)
* [Usage](#-usage)
* [License](#-license)
* [Contributors](#-contributors)
* [Questions](#-questions)
<p>&nbsp;</p>

## Description
A demo of game functionallity. The bones are there, just needs more graphics & enemy classes to match. 
Some important notes on file structure:
* The game is in views/partials: **game.handlebars** - Improve structure to reflect common handelbars practices?
* Some instructions on how to swap out images for the game are in **comments in game.handlebars**
* All JavaScript classes that run the game are in subfolders within ``` public/classes ```
* All images are in subfolders within ``` public/images ```
* The little bit of style is in **game.css** with ``` public/styles ``` - Improve as you see fit.
<p>&nbsp;</p>

## Installation
Run ``` npm i ``` from Emoji-Runner folder, connect to MySQL database ``` emoji_dev ``` then spin up your ``` node server ``` and open browser to ``` localhost:8080 ```
**To get to the game** from localhost, just add **/game** in browser nav bar. The page isn't directly linked to the rest of the app through any clickable somethings yet. In time, it should reject this direct navigation for users who are not logged in. Unless we want to add a clearly marked guest player mode? After playing a few rounds, you're prompted to make an account to save your score? *#stretchgoals*
<p>&nbsp;</p>

## Usage
Just use to spacebar or up arrow to avoid enemies. Remember you can **doublejump!** (We need to add instructions for the player somewhere on the game page.)
<p>&nbsp;</p>

---
<p>&nbsp;</p>

## License
All rights reserved.
<p>&nbsp;</p>

## Contributors
see main README.md of this repo's master branch
<p>&nbsp;</p>

## Questions?
  * **David Metcalf**
  * **GitHub:** [gloriousLoaf](https://github.com/gloriousLoaf)
  * <davidmetcalfwork@gmail.com>

<img src="https://github.com/gloriousLoaf.png" alt="GitHub Profile Pic" width="125" height="125">
<p>&nbsp;</p>

---

##### This markdown was created with [Readme Generator](https://github.com/gloriousLoaf/Readme-Generator)