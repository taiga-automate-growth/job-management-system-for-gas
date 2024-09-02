class AchievementsRepository {
    constructor(){
      const ssId = PropertiesService.getScriptProperties().getProperty('spreadsheet-id');
      this.db = SpreadsheetDB.create(ssId, 'achievements');
    }
  
    find(){
      let achievementDatas = this.db.get();
      achievementDatas = achievementDatas.map(achievementData => {
        return achievementData[0];
      });
      const achievements = new Achievements(achievementDatas);
      return achievements;
    }
  }
  