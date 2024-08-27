class CollectNewJobDetailUsecase{
  constructor(){
    this.jobRepository = new JobRepository();
    this.keywordRepository = new KeywordsRepository();
    this.crowdworks = new Crowdworks();
    this.lancers = new Lancers();
    const accessToken = PropertiesService.getScriptProperties().getProperty('line-access-token');
    this.line = new Line(accessToken);
  }

  handle(){
    const jobs = this.jobRepository.findNotGetAllInfo();
    let limit = 300;
    
    const newJobs = new Map();
    
    for(const [key,job] of jobs){
      if(limit <= 20) break;
      
      const site = job.getSite();
      try {
        if(site === this.crowdworks.getSiteName()){
          const newJob = this.crowdworks.getAllInfo(job);
          newJobs.set(key,newJob);
          limit = limit - 30;
        }else if(site === this.lancers.getSiteName() && limit >= 100){
          const newJob = this.lancers.getAllInfo(job);
          newJobs.set(key,newJob);
          limit = limit - 300;
          break;
        }
      } catch (error) {
        console.log('エラーです');
        console.log(error)
      }
    }
    this.jobRepository.saveAll(newJobs);
    this.line.notifyNewJob(newJobs);
  }
}