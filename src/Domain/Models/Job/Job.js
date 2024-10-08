class Job{

  /**
   * @param {number} id - 案件ID
   * @param {string} title - 案件名
   * @param {number} number - 案件番号
   * @param {string} detail - 案件詳細
   * @param {string} deadline - 応募期限
   * @param {'ランサーズ' | 'クラウドワークス'} site - 掲載サイト
   * @param {'提案前','提案しない','提案中','契約済み','不採用'} isSuggest - 提案可否
   * @param {string} suggestion - 提案内容
   * @param {bool} isGetAllInfo - 全ての情報を取得しているかのフラグ。取得している場合はtrue,まだの場合はfalse
   */
  constructor(id = 0, title, number, detail, deadline, site, isSuggest = true, suggestion = "", isGetAllInfo){

    /** 
     * @private
     * @type {number} 
     */
    this.id = id;

    /** 
     * @private
     * @type {string} 
     */
    this.title = title;

    /**
     * @private 
     * @type {number}
     */
    this.number = number;

    /** 
     * @private
     * @type {string} 
     */
    this.detail = detail;

    /** 
     * @private
     * @type {string} 
     */
    this.deadline = deadline;

    /** 
     * @private
     * @type {string} 
     */
    this.site = site;

    /** 
     * @private
     * @type {bool} 
     */
    this.isSuggest = isSuggest;

    /** 
     * @private
     * @type {string} 
     */
    this.suggestion = suggestion;

    /**
     * @private
     * @type {bool}
     */
    this.isGetAllInfo = isGetAllInfo;
  }

  getTitle(){
    return this.title;
  }

  getId(){
    return this.id;
  }

  getNumber(){
    return this.number;
  }

  getDetail(){
    return this.detail;
  }

  getDeadline(){
    return this.deadline;
  }

  getSite(){
    return this.site;
  }

  getIsSuggest(){
    return this.isSuggest;
  }

  getSuggestion(){
    return this.suggestion;
  }

  getIsGetAllInfo(){
    return this.isGetAllInfo;
  }

  getUrl(){
    if(this.site === 'ランサーズ'){
      return `https://www.lancers.jp/work/detail/${this.number}`;
    }
    if(this.site === 'クラウドワークス'){
      return `https://crowdworks.jp/deeplink/job_offers/${this.number};`
    }
    throw new Error('クラウドワークスとランサーズ以外のサイトには対応していません');
  }

  isCrowdWorks(){
    if(this.site === 'クラウドワークス') return true;
    return false;
  }

  isLancers(){
    if(this.site === 'ランサーズ') return true;
    return false;
  }

  /**
   * IDを設定する
   * 
   * @param {number} id - ID
   */
  setId(id){
    this.id = id;
  }

  /**
   * 案件名を設定する
   * 
   * @param {string} title - 案件名
   */
  setTitle(title){
    this.title = title;
  }

  /**
   * 案件詳細を設定する
   * 
   * @param {string} detail - 案件詳細 
   */
  setDetail(detail){
    this.detail = detail;
  }

  /**
   * 締切を設定する
   * 
   * @param {string} deadline - 応募締め切り
   */
  setDeadline(deadline){
    this.deadline = deadline;
  }

  /**
   * 提案文を設定する
   * 
   * @param {string} suggestion - 提案文
   */
  setSuggestion(suggestion){
    this.suggestion = suggestion;
  }

  /**
   * 全ての情報を取得した
   */
  gotAllInfo(){
    this.isGetAllInfo = true;
  }

  /**
   * 提案を拒否する
   */
  cancelSuggestion(){
    this.isSuggest = '提案しない';
  }
}