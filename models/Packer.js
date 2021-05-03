const {
    firstBy
} = require('thenby');
const Box = require('./Box');

const PACKING_METHODS = {
    SPACE_UTILIZATION: 'SPACE_UTILIZATION',
    MIN_BOX: 'MIN_BOX'
}

function Packer(boxes, packingMethod) {
    this._boxes = boxes;
    this.boxes = boxes;
    this.items = [];
    this.packingMethod = packingMethod;
    this.packings = [];
    this.unpacked = [];
    this.pack = function () {
        if (this.packingMethod === PACKING_METHODS.SPACE_UTILIZATION) {
            this.boxes.sort(firstBy((a, b) => a.width - b.width).thenBy((a, b) => a.height - b.height).thenBy((a, b) => a.depth - b.depth));
        } else if (this.packingMethod === PACKING_METHODS.MIN_BOX) {
            this.boxes.sort(firstBy((a, b) => b.width - a.width).thenBy((a, b) => b.height - a.height).thenBy((a, b) => b.depth - a.depth));
        }
        for (let i = 0; i < this.items.length; i++) {
            let currentItem = this.items[i];
            let boxIndex;
            let useBox;
            let alreadyUsed = false;

            boxIndex = this.findInPackings(currentItem);
            if (boxIndex !== null && boxIndex !== -1) {
                useBox = this.packings[boxIndex];
                alreadyUsed = true;
            } else {

                boxIndex = this.findInBoxes(currentItem);

                if (boxIndex !== null && boxIndex !== -1) {

                    let box = this.boxes[boxIndex];
                    useBox = new Box(box.name, box.width, box.height, box.depth);
                    
                } else {
                    this.unpacked.push(currentItem);
                    continue;
                }
            }

            useBox.qty++;
            

            let added = useBox.putItem(currentItem);
            if (added && !alreadyUsed) {
                this.packings.push(useBox);
            }
        }

    };
    this.addItem = function (item, qty) {
        for (let q = 1; q <= qty; q++) {
            this.items.push(item);
        }
        this.items.sort(firstBy((a, b) => b.width - a.width).thenBy((a, b) => b.height - a.height).thenBy((a, b) => b.depth - a.depth));
    }
    this.findInBoxes = function (item) {
        return this.boxes.findIndex(box => box.width >= item.width && box.height >= item.height && box.depth >= item.depth);
    }
    this.findInPackings = function (item) {
        return this.packings.findIndex(box => {
            let remainingSpace = box.getRemainingSpace();
            return remainingSpace.X >= item.width && remainingSpace.Y >= item.height && remainingSpace.Z >= item.depth;
        })
    };
    this.getPackingsObj = function() {
        let packingObj = {};
        for(let i = 0 ; i < this.packings.length ; i++) {
            let package = this.packings[i];
            if (!packingObj[package.name]) packingObj[package.name] = 0;
            packingObj[package.name]++;
        }
        return packingObj;
    }
}

module.exports = {
    Packer,
    PACKING_METHODS
}