class JobDuplicateChecker{
  constructor(){
    this.repository = new JobRepository();
  }

  /**
   * @param {Map<number,Job>} jobs - 案件配列
   */
  handle(jobs){
    let registerdJobs;
    try{
      registerdJobs = this.repository.findAll();
    }catch(e){
      console.log(e);
      return jobs;
    }

    for(const [key,job] of jobs){
      for(const registerdJob of registerdJobs.values()){
        if(registerdJob.getNumber() != job.getNumber()) continue;
        if(registerdJob.getSite() != job.getSite()) continue;
        
        jobs.delete(key);
        break;
      }
    } 
    return jobs;
  }
}