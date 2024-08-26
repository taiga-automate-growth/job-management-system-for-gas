class Lancers extends JobSite {
  constructor(){
    super('ランサーズ', 'https://www.lancers.jp', 10);
  }

  /**
   * 案件一覧のHTMLコンテンツを取得する
   * 
   * @param {string} keyword - 案件検索キーワード
   * @return {string} 案件一覧HTMLコンテンツ
   */
  getJobListContent(keyword){
    const url = this.url + '/work/search?open=1&show_description=1&budget_from=&budget_to=&keyword=' + keyword;
    console.log(url);
    const content = UrlFetchApp.fetch(url, {
      method: 'GET',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
    })
    .getContentText();
    return content;
  }

  getJobDetailContent(jobNumber){
    const url = this.url + '/work/detail/' + jobNumber;
    // const phantomJsCloud = PhantomJsCloud.create('ak-de1bk-a75m1-c7shb-jaqb3-s23yw');
    // const content = phantomJsCloud.getContent(url);
    const content = UrlFetchApp.fetch(url, {
      method: 'GET',
      'muteHttpExceptions' : true
    })
    .getContentText();
    if(content.getResponseCode() !== 200) throw new HtmlContentNotFoundException(`ランサーズに詳細ページが存在しません。\n案件番号${jobNumber}`);
    return content;
  }

  /**
   * 案件名を取得する
   * 
   * @param {string} jobDetailContent - 案件詳細HTMLコンテンツ
   * @return {string} 案件名
   */
  getJobTitle(jobDetailContent){
    const startString = '<title>';
    const endString = '</title>';
    const jobTitle = HtmlParser.byText(jobDetailContent, startString, endString);
    if(jobTitle.length > 0) {
      return jobTitle[0];
    }
  }

  /**
   * 案件詳細を取得する
   * 
   * @param {string} jobDetailContent - 案件詳細HTMLコンテンツ
   * @return {string} 案件詳細 
   */
  getJobDetail(jobDetailContent){
    const startString = ' <dd class="c-definition-list__description">';
    const endString = '</dd>';
    const jobDetail = HtmlParser.byText(jobDetailContent, startString, endString);
    if(jobDetail.length > 0){
      return jobDetail[2];
    }
  }

  /**
   * 応募期限を取得する
   * 
   * @param {string} jobDetailContent - 案件詳細HTMLコンテンツ
   * @return {string} 応募期限
   */
  getDeadline(jobDetailContent){
    return '';
  }

  /**
   * キーワードに一致する案件番号をすべて取得する
   * 
   * @param {string} keyword - キーワード
   * @return {Map<number,Job>} キーワードに一致する案件の配列
   */
  findMatchingJobNumbers(keyword){
    let jobListContent = this.getJobListContent(keyword);
    jobListContent = HtmlParser.removeBackward(jobListContent, '新着の仕事');
    docPreview('1zFyjz6xTJ-4p3E-aOHfkrdM7UEzaQ_Jsjb5Q_e80gdw', jobListContent);
    const regex = /href="\/work\/detail\/(\d+)">/g;
    const numbers = HtmlParser.byRegex(jobListContent, regex);

    const jobs = numbers.reduce((jobs, jobNumber,index) => {
      const job = new Job(null, '', jobNumber, '', '', this.siteName, true, '', false);
      jobs.set(index, job);
      return jobs;
    },new Map());

    return jobs;
  }
}