# Pet the Catto


## Technologies Used

HTML, CSS, JavaScript, jQuery, SASS


## Description

A two player turn-based game where the objective is to avoid upsetting the cat.


## Gameplay

1. Players will select from three different cats corresponding to the difficulty of the game, based on the number of points needed to win and the number of 'wrong' spots generated on the cat. 
2. Players can enter their names to be used in the game.
3. Players will take turns clicking on a different part of the cat each turn. If a player clicks on a 'wrong' spot, he or she is deemed to lose the round and the other player will gain a point.
4. The game is over when the winning score is reached by one player (as determined by the difficulty level selected in Step 1).
5. Players can choose to restart the game and select a different difficulty level.


## Approach taken

I decided to use CSS and HTML to create the cat as I needed to add functionality to each individual part, such as event listeners and animations. I did not opt to use images as I wanted to avoid the issue of the click area encompassing the whole boundary box of the image. I also wanted to improve my CSS skills, particularly animations and shapes. I also chose to use a CSS preprocessor, SASS, to become more familiar with it.

JavaScript was used to generate 1 to 3 (depending on the difficulty level) random 'wrong' spots on the cat each round by attaching a 'woops' class to the spot(s). It also keeps track of which spots have already been clicked, and removes the class at the end of each round. The winning score required is updated for each difficulty level, and the current turn is alternated between 1 and 2.

Midway through the project, I decided to incorporate jQuery into my project as I realized it could help me select elements much more efficiently. I also used the sweetAlert2 modal library to make the game more interactive and dynamic.


## Installation instructions

<a href="https://joeyqlim.github.io/pet-the-catto/">Live Demo</a>


## Credits and inspiration

* Catspeak language inspired by <a href="https://www.facebook.com/groups/133018060894811/">THIS CAT IS C H O N K Y</a>
* Lovely cat drawings by <a href="https://www.instagram.com/mofu_sand/?hl=en">@mofu_sand</a>
* Background created with <a href="https://www.svgbackgrounds.com/">SVG Backgrounds</a>