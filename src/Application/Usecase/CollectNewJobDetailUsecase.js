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
    const notRegisteredCrowdworksJobs = this.jobRepository.findUnCompleted();
    const crowdworksJobs = this.crowdworks.getJobs();
    const lancersJobs = this.lancers.getJobs(notRegisteredLancersNumbers);
    this.line.notifyNewJob(newJobs);
  }
}