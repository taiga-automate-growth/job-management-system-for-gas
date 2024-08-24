class JobSite {

  /**
   * @constructor
   * 
   * @param {string} siteName - サイト名称
   * @param {string} url - サイトURL
   * @param {number} crawlDelay - クロール間隔（秒） 
   */
  constructor(siteName, url,crawlDelay){
    this.siteName = siteName;
    this.url = url;
    this.crawlDelay = crawlDelay;
  }

  /**
   * @param {string} content - 取得対象の文字列
   * @param {string} startString - 取得開始文字列
   * @param {string} endString - 取得終了文字列
   * @return {Array<string>} 取得結果文字列の配列
   */
  parseText(content, startString,endString){
    const results = [];
    let startIndex = 0;

    while (true) {
      startIndex = content.indexOf(startString, startIndex);
      if (startIndex === -1) break;

      const endIndex = content.indexOf(endString, startIndex + startString.length);
      if (endIndex === -1) break;

      const extractedString = content.substring(startIndex + startString.length, endIndex);
      results.push(this.trim(extractedString));

      startIndex = endIndex + endString.length;
    }

    return results;
  
  }

  parseRegex(content,regex){
    const results = [];
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      results.push(match[1].trim(match[1]));
    }
    
    return results;

  }

  /**
   * テキストを成形する
   * 
   * @param {string} text - 成形対象のテキスト
   */
  trim(text){
    text = text.replace(/\n/g, '');
  
    text = text.replace(/<br\s*\/?>/g, '\n');
    
    text = text.replace(/<\/?[^>]+(>|$)/g, '');

    return text;
  }

  /**
   * 案件の全ての情報を取得する
   *
   * @param {Job} job - 案件
   * @return {Job} 案件
   */
  getAllInfo(job){
    const jobNumber = job.getNumber();
    const jobDetailContent = this.getJobDetailContent(jobNumber);
    const jobTitle = this.getJobTitle(jobDetailContent);
	job.setTitle(jobTitle);
	  
	const jobDetail = this.getJobDetail(jobDetailContent);
	job.setDetail(jobDetail);
	
	const jobDeadline = this.getJobDeadline(jobDetailContent);
	job.setDeadline(jobDeadline);
	job.gotAllInfo();
	return job;
  }

  /**
   * サイト名を取得する
   */
  getSiteName(){
    return this.siteName;
  }

  /**
   * 案件のタイトルを取得する
   * 
   * @param {string} jobDetailContent - 案件詳細ページのHTMLコンテンツ
   * @return {string} 案件名
   */
  getJobTitle(jobDetailContent){}

  /**
   * 案件の詳細を取得する
   * 
   * @param {string} jobDetailContent - 案件詳細ページのHTMLコンテンツ
   * @return {string} 案件詳細
   */
  getJobDetail(jobDetailContent){}

  /**
   * 案件の締切を取得する
   * @param {string} jobDetailContent - 案件詳細ページのHTMLコンテンツ
   * @return {string} 案件締切
   */
  getJobDeadline(jobDetailContent){}
}