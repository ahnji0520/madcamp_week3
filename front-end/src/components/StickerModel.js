import { v4 as uuidv4 } from 'uuid';

class StickerModel {
  constructor(name, top = 0, left = 0, width = 50, height = 50, angle = 0) {
    this.id = uuidv4();
    this.name = name;
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
    this.angle = angle;
  }
}

export default StickerModel;
