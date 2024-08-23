class CollectNewJobDetailUsecase{
  handle(){
    
    const crowdworksJobs = this.crowdworks.getJobs(notRegisteredCrowdworksJobs);
    const lancersJobs = this.lancers.getJobs(notRegisteredLancersNumbers);
    this.line.notifyNewJob(newJobs);
  }
}