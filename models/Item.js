function Item(name, width, height, depth) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.position = {
        X: null,
        Y: null,
        Z: null
    }
}

module.exports = Item;