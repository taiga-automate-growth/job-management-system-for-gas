class Job{

  /**
   * @param {number} id - 案件ID
   * @param {string} title - 案件名
   * @param {number} number - 案件番号
   * @param {string} detail - 案件詳細
   * @param {string} deadline - 応募期限
   * @param {'ランサーズ' | 'クラウドワークス'} site - 掲載サイト
   * @param {bool} isSuggest - 提案可否
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
    console.log(this.site);
    if(this.site === 'ランサーズ'){
      return `https://www.lancers.jp/work/detail/${this.number}`;
    }
    if(this.site === 'クラウドワークス'){
      return `https://crowdworks.jp/public/jobs/${this.number};`
    }
    throw new Error('クラウドワークスとランサーズ以外のサイトには対応していません');
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
   * 全ての情報を取得した
   */
  gotAllInfo(){
    this.isGetAllInfo = true;
  }
}