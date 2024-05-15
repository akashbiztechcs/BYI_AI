class ModelCache {
    constructor() {
        this.models = new Map();
    }

    getModel(key) {
        return this.models.get(key);
    }

    setModel(key, modelInstance) {
        this.models.set(key, modelInstance);
    }

    hasModel(key) {
        return this.models.has(key);
    }
}

module.exports = new ModelCache();
