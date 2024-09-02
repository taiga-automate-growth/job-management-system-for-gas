class JobRepository extends IJobRepository{
  constructor(){
    super();
    const ssId = PropertiesService.getScriptProperties().getProperty('spreadsheet-id');
    this.dao = SpreadsheetDB.create(ssId, 'jobs');
  }

  /**
   * @return {Map<number,Job>} jobs - 案件配列
   */
  findAll(){
    const jobDatas = this.dao.get();

    const jobs = jobDatas.reduce((jobs, jobData, index) => {

      const id = jobData[0];
      const number = jobData[1];
      const title = jobData[2];
      const detail = jobData[3];
      const deadline = jobData[4];
      const site = jobData[5];
      const isSuggest = jobData[6];
      const suggestion = jobData[7];
      const isGetDetail = jobData[8];

      const job = new Job(id,title,number,detail,deadline,site,isSuggest,suggestion,isGetDetail);
      jobs.set(index, job);
      return jobs;

    }, new Map());

    return jobs;
  }

  /**
   * IDで取得する
   * 
   * @param {string} id - 求人ID
   */
  findById(id){
    const condition = [{
      column: 'job_id',
      operand: '=',
      values: [id]
    }];

    const jobDatas = this.dao.get(condition);
    const jobData = jobDatas[0];
    const jobId = jobData[0];
    const number = jobData[1];
    const title = jobData[2];
    const detail = jobData[3];
    const deadline = jobData[4];
    const site = jobData[5];
    const isSuggest = jobData[6];
    const suggestion = jobData[7];
    const isGetDetail = jobData[8];

    const job = new Job(jobId,title,number,detail,deadline,site,isSuggest,suggestion,isGetDetail);
    return job;
  }

  /**
   * @param {Map<number,Job>} jobs - 案件配列
   */
  saveAll(jobs){
    const registerdDatas = this.dao.get();

    const saveDatas = registerdDatas.reduce((prev,registerdData) => {
      const id = parseInt(registerdData[0]);
      prev[id] = registerdData;
      return prev;
    },{});

    console.log(saveDatas);

    for(const job of jobs.values()){
      const id = job.getId();
      const title = job.getTitle();
      const number = job.getNumber();
      const detail = job.getDetail();
      const deadline = job.getDeadline();
      const site = job.getSite();
      const isSuggest = job.getIsSuggest();
      const suggestion = job.getSuggestion();
      const isGetDetail = job.getIsGetAllInfo();
      const saveData = [id,number,title,detail,deadline,site,isSuggest,suggestion,isGetDetail];
      saveDatas[id] = saveData;
    }

    const data = Object.values(saveDatas);
    this.dao.deleteAll();
    this.dao.set(data);
  }

  /**
   * 自動採番
   * 
   */
  generateNextId(){
    try{
      const lastData = this.dao.getLastData();
      let lastId = lastData[0];
      return lastId + 1;
    }catch(e){
      return 1;
    }
  }
  
  /**
   * 全ての情報を取得してない案件のみを取得する
   * @return {Map<number,Job>} jobs - 案件配列
   */
  findNotGetAllInfo(){
	const conditions = [{
			  column: 'is_get_all_info',
			  operand: '=',
			  values: [false]
	}];
	const jobDatas = this.dao.get(conditions);
	const jobs = jobDatas.reduce((jobs, jobData, index) => {

      const id = jobData[0];
      const number = jobData[1];
      const title = jobData[2];
      const detail = jobData[3];
      const deadline = jobData[4];
      const site = jobData[5];
      const isSuggest = jobData[6];
      const suggestion = jobData[7];
      const isGetDetail = jobData[8];

      const job = new Job(id,title,number,detail,deadline,site,isSuggest,suggestion,isGetDetail);
      jobs.set(index, job);
      return jobs;

    }, new Map());

    return jobs;
  }
}