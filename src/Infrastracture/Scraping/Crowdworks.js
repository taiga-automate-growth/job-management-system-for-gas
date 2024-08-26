class Crowdworks extends JobSite {
  constructor(){
    super('クラウドワークス', 'https://crowdworks.jp', 2);
  }

  /**
   * 案件一覧のHTMLコンテンツを取得する
   * 
   * @param {string} keyword - 案件検索キーワード
   * @return {string} 案件一覧HTMLコンテンツ
   */
  getJobListContent(keyword){
    const url = this.url + '/public/jobs/search?hide_expired=true&order=new&search%5Bkeywords%5D=' + keyword;
    const content = UrlFetchApp.fetch(url,{
      method: 'GET',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
    })
    .getContentText();
    Utilities.sleep(this.crawlDelay * 1000);
    return content;
  }

  /**
   * 案件詳細HTMLコンテンツを取得する
   * 
   * @param {string} jobNumber - 案件番号
   * @return {string} 案件詳細HTMLコンテンツ
   */
  getJobDetailContent(jobNumber){
    const url = this.url + '/public/jobs/' + jobNumber;
    const content = UrlFetchApp.fetch(url, {
      method: 'GET',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
    })
    .getContentText();
    Utilities.sleep(this.crawlDelay * 1000);
    return content;
  }

  /**
   * 案件名を取得する
   * 
   * @param {string} jobDetailContent - 案件詳細HTMLコンテンツ
   * @return {string} 案件名
   */
  getJobTitle(jobDetailContent){
    const startString = '<h1>';
    const endString = '<span class="subtitle">';
    const jobTitle = HtmlPerser.byText(jobDetailContent, startString, endString);
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
    const startString = '<td class="confirm_outside_link">';
    const endString = '</td>';
    const jobDetail = HtmlPerser.byText(jobDetailContent, startString, endString);
    if(jobDetail.length > 0){
      return jobDetail[0];
    }
  }

  /**
   * 応募期限を取得する
   * 
   * @param {string} jobDetailContent - 案件詳細HTMLコンテンツ
   * @return {string} 応募期限
   */
  getDeadline(jobDetailContent){
    const regex = /<div>応募期限<\/div>\s*<\/th>\s*<td>(\d{4}年\d{2}月\d{2}日)<\/td>/g;
    const deadline = HtmlPerser.byRegex(jobDetailContent, regex);
    if(deadline.length > 0){
      return deadline[0];
    }
  }

  /**
   * キーワードに一致する案件番号をすべて取得する
   * 
   * @param {string} keyword - キーワード
   * @return {Map<number, Job>} キーワードに一致する案件番号の配列
   */
  findMatchingJobNumbers(keyword){
    const jobListContent = this.getJobListContent(keyword);
    const startString = ';job_offer&quot;:{&quot;id&quot;:';
    const endString = ',&quot;title&quot;:&quot';
    const jobNumbers = HtmlParser.byText(jobListContent, startString, endString);

    const jobs = jobNumbers.reduce((jobs, jobNumber,index) => {
      const job = new Job(null, '', jobNumber, '', '', this.siteName, true, '', false);
      jobs.set(index, job);
      return jobs;
    },new Map());

    return jobs;
  }
}