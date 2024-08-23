class KeywordsRepository {
  constructor(){
    this.db = new DB('keywords');
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
