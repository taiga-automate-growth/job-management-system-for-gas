class CollectNewJobUsecase{
  constructor(){
    this.jobRepository = new JobRepository();
    this.keywordRepository = new KeywordsRepository();
    this.crowdworks = new Crowdworks();
    this.lancers = new Lancers();
    const accessToken = PropertiesService.getScriptProperties().getProperty('line-access-token');
    this.line = new Line(accessToken);
  }

  handle(){
    const keywords = this.keywordRepository.find();
    
    let crowdworksJobs;
    let lancersJobs;

    const jobDuplicateChecker = new JobDuplicateChecker();

    while(keywords.hasNext()){
      const keyword = keywords.next();

      const crowdworksJobNumbers = this.crowdworks.findMatchingJobNumbers(keyword);
      crowdworksJobs = jobDuplicateChecker.handle(crowdworksJobNumbers);
      
      const lancersJobNumbers = this.lancers.findMatchingJobNumbers(keyword);
      lancersJobs = jobDuplicateChecker.handle(lancersJobNumbers);

    }

    let newId = this.jobRepository.generateNextId();
    const newJobs = new Map();

    for(const crowdworksJob of crowdworksJobs.values()){
      crowdworksJob.setId(newId);
      newId++
      newJobs.set(newId, crowdworksJob);
    }

    for(const lancersJob of lancersJobs.values()){
      lancersJob.setId(newId);
      newId++
      newJobs.set(newId, lancersJob);
    }

    this.jobRepository.saveAll(newJobs);
  }
}