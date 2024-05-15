class ClientCache {
    constructor() {
        this.clients = new Map();
    }

    getClient(key) {
        return this.clients.get(key);
    }

    setClient(key, clientInstance) {
        this.clients.set(key, clientInstance);
    }

    hasClient(key) {
        return this.clients.has(key);
    }
}

module.exports = new ClientCache();
