class Achievements {
    /**
     * @constructor
     * @param {Array<string>} achievements - キーワードの配列
     */
    constructor(achievements = []){
      this.list = achievements;
      this.index = 0;
    }
  
    setAchievement(achievement){
      this.list.push(achievement);
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