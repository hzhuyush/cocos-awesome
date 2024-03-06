const { ccclass, property } = cc._decorator;

// interface IResult {
//   placeId: number;
// }

// interface IPlace {
//   id: number;
//   explore: number;
// }

@ccclass
export default class Infinite_bg_scroll extends cc.Component {
  @property(cc.Node)
  bg1: cc.Node = null;
  @property(cc.Node)
  bg2: cc.Node = null;

  speed: number = 20;

  bgs: cc.Node[] = [];

  count: number = 0;

  total: number  = 0;

  // countList: number[] = [];

  // results: IResult[] = [];

  // placesDict: {[key: number]: IPlace} = {};


  onLoad() {
    const viewSize = cc.view.getVisibleSize();
    this.bg2.getComponent(cc.Widget).left = viewSize.width;
    this.bg2.getComponent(cc.Widget).right = -viewSize.width;

    this.bgs.push(this.bg1);
    this.bgs.push(this.bg2);
  }

  update(dt) {
    if (this.speed == 0) return;
    this.speed -= 0.05;
    this.count++;
    this.total += this.speed;
    const temp = this.speed;
    if (this.speed < 0) {
      console.log("count: ", this.count, this.total);
      this.speed = 0;
    }

    // if (this.bg2.x - temp <= 0) {
    //   this.bg1.x = this.bg2.x;
    //   this.bg2.x = this.bg1.x + this.bg1.width;
    // }

    // this.bg1.x -= temp;
    // this.bg2.x -= temp;

    let index = 0
    let count = this.bgs.length
    do {
      let bg = this.bgs[index];
      if (Math.abs(bg.x) > bg.width) {
        let width = 0;
        this.bgs.splice(index, 1);
        for (let node of this.bgs) {
          width += node.width;
        }
        let next = this.bgs[index];
        bg.x = next.x + width + temp;
        this.bgs.push(bg);
      } else {
        index++;
      }
      bg.x -= temp;
    } while (index < count)
  }

  // loadData() {
  //   for (let data of this.results) {
  //     let placeData = this.placesDict[data.placeId];
  //     let exploreCount = placeData ? placeData.explore + 1 : 0;
  //     if (exploreCount > 0) placeData.explore = exploreCount;
  //     this.countList.push(exploreCount);
  //   }
  // }
}
