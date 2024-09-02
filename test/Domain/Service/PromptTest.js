function testPromptGenerate(){
    const promptGenerator = new Prompt();
    const jobRepository = new JobRepository();
    const job = jobRepository.findById(1);
    console.log(job);
    const achievementsRepository = new AchievementsRepository();
    const achievements = achievementsRepository.find();
    console.log(achievements);
    const prompt = promptGenerator.forGenerateSuggestion(job,achievements);
    console.log(prompt);
    const geminiApiKey = PropertiesService.getScriptProperties().getProperty('gemini-api-key');
    const gemini = Gemini.create(geminiApiKey);
    const answer  = gemini.sendTextPrompt(prompt);
    console.log(answer);
}