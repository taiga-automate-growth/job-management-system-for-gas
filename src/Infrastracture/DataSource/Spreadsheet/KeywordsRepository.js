class KeywordsRepository {
  constructor(){
    const ssId = PropertiesService.getScriptProperties().getProperty('spreadsheet-id');
    this.db = SpreadsheetDB.create(ssId, 'keywords');
  }

  find(){
    let keywordDatas = this.db.get();
    keywordDatas = keywordDatas.map(keywordData => {
      return keywordData[0];
    });
    const keywords = new Keywords(keywordDatas);
    return keywords;
  }
}
