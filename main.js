const Item = require('./models/Item');
const Box = require('./models/Box');
const {Packer, PACKING_METHODS} = require('./models/Packer');

const items = [
    new Item('TMX75', 51.2, 66.5, 76, 1),
    new Item('TMX65', 51.2, 66.5, 76, 7),
    new Item('Nutsert', 4, 4, 4, 10),
    new Item('KLO', 5, 5, 5, 12),
    new Item('CAP-BTM', 2, 2, 2, 20)
];

const boxes = [
    new Box('TMX65 Carton', 51.5, 67, 76.5),
    new Box('TMX75 Carton', 52.5, 67, 77.5),
    new Box('500g Satchel', 10, 5, 10),
    new Box('1KG Satchel', 10, 5, 20),
    new Box('5KG Satchel', 20, 10, 50),
]

const packer = new Packer(boxes, items, PACKING_METHODS.SPACE_UTILIZATION);
packer.pack();