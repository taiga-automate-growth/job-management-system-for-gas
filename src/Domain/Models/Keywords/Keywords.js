class Keywords {
  /**
   * @constructor
   * @param {Array<string>} keywords - キーワードの配列
   */
  constructor(keywords = []){
    this.list = keywords;
    this.index = 0;
  }

  setKeyword(keyword){
    this.list.push(keyword);
  }

  hasNext(){
    if(this.list.length > this.index) return true;
    return false;
  }

  next(){
    const result =  this.list[this.index];
    this.index++;
    return result;
  }
}