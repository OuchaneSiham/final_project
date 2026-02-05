// Define GameClient class
class GameClient {
    // This Id is the user id connected;
    // From here we can get it via the url
    // based on the JWT() and extract it.
    // Ex. const ws = new WebSocket("ws://localhost:8080?token=JWT_Here");
    // This token has parts separate by '.' as following:
    // HEADER.PAYLOAD.SIGNATURE
    userId; // Id of the user in the DB; need to track the user later.
    // We can loss the connection with the user or a crash; but the user remains
    // the same client. We can use the Id to store the score; the match history
    // reconnect a user
    // For clientId it can be optional as
    // not all clients are players; it
    // will be used for the main players
    // and for spectators the userId is enough
    clientId;
    // username is optional and can be get from users DB
    username;
    socket; // For ws connexion
    role;
    disconnected; // Track when the player is disconnected
    isReady; // Is the user ready to play
    roomId; // Will be used for game rooms
    connectedAt; // connection timestamp
    ping = 0; // For latency in ms. Measures the time
    // between client-server communication. Useful to detect lags; cheats etc.
    constructor(userId, socket, role = "PLAYER", roomId, clientId, username) {
        this.userId = userId;
        this.clientId = clientId;
        this.connectedAt = Date.now(); // Get the timestamp when the client connected
        this.isReady = false; // By default false
        this.role = role;
        this.username = username;
        this.socket = socket; // For ws connection
        this.roomId = roomId;
        this.disconnected = false;
    }
    // ----- GETTERS -----
    getUserId() {
        return this.userId;
    }
    getClientId() {
        return this.clientId;
    }
    getUsername() {
        return this.username;
    }
    getSocket() {
        return this.socket;
    }
    getRole() {
        return this.role;
    }
    getRoomId() {
        return this.roomId;
    }
    getIsReady() {
        return this.isReady;
    }
    getConnectedAt() {
        return this.connectedAt;
    }
    getPing() {
        return this.ping;
    }
    // ----- SETTERS -----
    setClientId(clientId) {
        this.clientId = clientId;
    }
    setUsername(username) {
        this.username = username;
    }
    setRole(role) {
        this.role = role;
    }
    setIsReady(isReady) {
        this.isReady = isReady;
    }
    setRoomId(roomId) {
        this.roomId = roomId;
    }
    setPing(ping) {
        this.ping = ping;
    }
    // Two methods after to check if the client is
    // a player or spectator
    isPlayer() {
        return this.role == 'PLAYER';
    }
    isSpectator() {
        return this.role == 'SPECTATOR';
    }
    isDisconnected() {
        return this.disconnected;
    }
    setDisconnected(status) {
        this.disconnected = status;
    }
    // Custom method to send message to the client via
    // WebSocket
    send(data) {
        this.socket.send(JSON.stringify(data));
    }
}
export default GameClient;
