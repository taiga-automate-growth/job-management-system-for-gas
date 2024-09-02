class CancelSuggestionUsecase{
    constructor(){
        this.jobRepository = new JobRepository();
        const accessToken = PropertiesService.getScriptProperties().getProperty('line-access-token');
        this.line = new Line(accessToken);
    }

    handle(postbackData,replyToken){
        const jobId = postbackData.id;
        const job = this.jobRepository.findById(jobId);
        job.cancelSuggestion();
        const jobs = new Map();
        jobs.set(0,job);
        this.jobRepository.saveAll(jobs);
        this.line.canceledSuggestionComplete(job,replyToken);
    }
}