
// Represents the current state of the game
export const GameStatus = {
    WAITING_OPPONENT: "WAITING_OPPONENT", // If some players are ready and waiting for others
    WAITING: "WAITING", // Game is waiting for players
    RUNNING: "RUNNING", // Game is currently running
    PAUSED: "PAUSED", // Game is paused
    FINISHED: "FINISHED" // Game has finished 
}

export default class GameState {
    // We can made all these properties public 
    // because GameState is only used internally
    // within the game engine. No external code 
    // can access it directly. So we don't need
    // to worry about encapsulation here.
    status = GameStatus.WAITING; // Indicates if the game is currently running 
    winnerId; // ID of the winner, null if no winner yet; 
    maxScore = 5; // Maximum score to win the game 
    maxPlayers = 2; // Maximum number of players allowed in the game
    constructor() {
        this.winnerId = null;
    }
    start() {
        this.status = GameStatus.RUNNING;
    }
    pause() {
        this.status = GameStatus.PAUSED;
    }
    finish() {
        this.status = GameStatus.FINISHED;
    }
    reset() {
        this.status = GameStatus.WAITING;
        this.winnerId = null;
    }
}