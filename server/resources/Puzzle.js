/*************************
        SCHEMAS
*************************/
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; //fixes depreciated mongoose promise by implementing ES6 promise.
// Puzzle schema represents the information needed at each
// stop in the treasure hunt.  
var puzzleSchema = new mongoose.Schema({
  treasureHuntTitle: String,
  // Unique IDs of the current, previous, and next puzzles
  // (like a linked list of puzzles).
  next: {
    type: String,
    default: 'null'
  },
  previous: {
    type: String,
    default: 'null'
  },
  // Location where user must be to receive/solve the riddle.
  location: {
    latitude: Number,
    longitude: Number
  },
  // Radius from location that the user must be within in order to receive/solve the puzzle.
  // Currently default is 40 (feet?) but this will probably change depending on what data
  // is needed to provide geofencing.
  radius: {
    type: Number,
    default: 40
  },
  // The title of the puzzle
  // ( ex: 'The Goat of Hack Reactor' );
  riddleTitle: {
    type: String
  }, 
  // The riddle that must be solved.
  // ( ex: 'What lies beneith the stone goat?' )
  riddleContent: String,
  // An array of acceptable answers to the riddle.
  // ( ex: ['wreath', 'wreaths', 'stone wreath', 'stone wreaths', 'garland', 'garlands', 'stone garland' ...] )
  riddleAnswer: String
}, 
{
  versionKey: false
});
//indexes puzzles uniquely based on the combination of their title and associated treasure hunt
puzzleSchema.index({treasureHuntTitle: 1, riddleTitle: 1}, {unique: true});

module.exports = mongoose.model('Puzzle', puzzleSchema);