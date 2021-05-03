function Item (name, width, height, depth) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.positionInBox = {
        X: 0,
        Y: 0,
        Z: 0
    }
}

module.exports = Item;