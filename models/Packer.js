const {firstBy} = require('thenby')

const PACKING_METHODS = {
    SPACE_UTILIZATION: 'SPACE_UTILIZATION',
    MIN_BOX: 'MIN_BOX'
}

function Packer (boxes, items, packingMethod) {
    this.boxes = boxes;
    this.items = items;
    this.packingMethod = packingMethod;
    this.packings = [];
    this.unpacked = [];
    this.pack = function() {
        if (this.packingMethod === PACKING_METHODS.SPACE_UTILIZATION) {
            this.boxes.sort(firstBy((a, b) => a.width - b.width).thenBy((a, b) => a.height - b.height).thenBy((a, b) => a.depth - b.depth));
        } else if (this.packingMethod === PACKING_METHODS.MIN_BOX) {
            this.boxes.sort(firstBy((a, b) => b.width - a.width).thenBy((a, b) => b.height - a.height).thenBy((a, b) => b.depth - a.depth));
        }
        
    };
    this.addItem = function(item, qty) {
        for(let q = 1 ; q <= qty ; q++) {
            this.items.push(item);
        }
    }
}

module.exports = {
    Packer,
    PACKING_METHODS
}