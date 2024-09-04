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
   * 案件の全ての情報を取得する
   *
   * @param {Job} job - 案件
   * @return {Job} 案件
   */
  getAllInfo(job){
    const jobNumber = job.getNumber();
    try {
      const jobDetailContent = this.getJobDetailContent(jobNumber);
      const jobTitle = this.getJobTitle(jobDetailContent);
      job.setTitle(jobTitle);
        
      const jobDetail = this.getJobDetail(jobDetailContent);
      job.setDetail(jobDetail);
      
      const jobDeadline = this.getJobDeadline(jobDetailContent);
      job.setDeadline(jobDeadline);
      job.gotAllInfo();
      return job;
    } catch (error) {
      throw error;   
    }
  }

  /**
   * サイト名を取得する
   */
  getSiteName(){
    return this.siteName;
  }

  /**
   * 案件詳細ページのHTMLコンテンツを取得する
   * 
   * @return {string} 案件詳細ページのHTMLコンテンツ
   */
  getJobDetailContent(){}

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