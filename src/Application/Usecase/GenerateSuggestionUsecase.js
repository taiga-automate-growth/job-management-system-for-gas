class GenerateSuggestionUsecase{
    constructor(){
        this.jobRepository = new JobRepository();
        this.achievementsRepository = new AchievementsRepository();
        const apikey = PropertiesService.getScriptProperties().getProperty('gemini-api-key');
        this.gemini = Gemini.create(apikey);
        this.logger = DocumentLogger.create('1-8H6oA7bl8hVlGbhhlJvRyBqHFRPjgSk_RuW91P3UHg');
        const accessToken = PropertiesService.getScriptProperties().getProperty('line-access-token');
        this.line = new Line(accessToken);
        this.logger.log(JSON.stringify(this));
    }

    handle(postbackData,replyToken){
        const jobId = parseInt(postbackData.id);
        const job = this.jobRepository.findById(jobId);
        this.logger.log(JSON.stringify(job));
        const achievements = this.achievementsRepository.find();
        const prompt = new Prompt().forGenerateSuggestion(job,achievements);
        const suggestion = this.gemini.sendTextPrompt(prompt);
        this.logger.log(suggestion);
        job.setSuggestion(suggestion);
        const jobs = new Map();
        jobs.set(0,job);
        this.jobRepository.saveAll(jobs);
        const reply = this.line.sendSuggestion(suggestion,replyToken);
    }
}