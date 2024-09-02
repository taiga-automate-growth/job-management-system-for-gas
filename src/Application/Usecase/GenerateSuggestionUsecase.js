class GenerateSuggestionUsecase{
    constructor(){
        this.jobRepository = new JobRepository();
        this.achievementsRepository = new AchievementRepository();
        const apikey = PropertiesService.getScriptProperties().getProperty('gemini-api-key');
        this.gemini = Gemini.create(apikey);
        this.logger = DocumentLogger.create('1-8H6oA7bl8hVlGbhhlJvRyBqHFRPjgSk_RuW91P3UHg');
        const accessToken = PropertiesService.getScriptProperties().getProperty('line-access-token');
        this.line = new Line(accessToken);
    }

    handle(postbackData,replyToken){
        const jobId = postbackData.id;
        const job = this.jobRepository.findById(jobId);
        const achievements = this.achievementsRepository.find();
        const prompt = new Prompt().forGenerateSuggestion(job,achievements);
        const suggestion = this.gemini.sendTextPrompt(prompt);
        logger.log(suggestion);
        const reply = this.line.sendSuggestion(suggestion,replyToken);
    }
}