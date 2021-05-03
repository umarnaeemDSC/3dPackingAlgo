 function Box(name, width, height, depth) {
     this.name = name;
     this.width = width;
     this.height = height;
     this.depth = depth;
     this.items = [];
     this.qty = 0;
     this.usedSpace = {
         X: 0,
         Y: 0,
         Z: 0
     }
     this.putItem = function(item) {
         
        
        return false;
        
     }
     this.addToSpace = function(item) {
         if (this.items.length === 0) {
            this.usedSpace.X += item.width;
            this.usedSpace.Y += item.height;
            this.usedSpace.Z += item.depth;
         }
     }
     
     this.getRemainingSpace = function() {
         return {
             X: this.width - this.usedSpace.X,
             Y: this.height - this.usedSpace.Y,
             Z: this.depth - this.usedSpace.Z,
         }
     }
 }

 module.exports = Box;