function doPost(e){
    const logger = DocumentLogger.create('1-8H6oA7bl8hVlGbhhlJvRyBqHFRPjgSk_RuW91P3UHg');
    logger.log('リクエストを受け付けたよ！！');
    try {
        
        const accessToken = PropertiesService.getScriptProperties().getProperty('line-access-token');
        const line = LineBot.create(accessToken);
        const webHookEvent = line.receiveEvent(e);
        const senderId = webHookEvent.getSenderId();
        line.loading(senderId, 60);

        if(webHookEvent.isPostbackEvent()){
            const postbackData = webHookEvent.getPostbackData();
            const replyToken = webHookEvent.getReplyToken();

            if(postbackData.action === 'generateSuggestion'){
                new GenerateSuggestionUsecase().handle(postbackData,replyToken);
            }else if(postbackData.action === 'cancelSuggestion'){
                new CancelSuggestionUsecase().handle(postbackData,replyToken);
            }
        }
    
    } catch (error) {
        logger.log(error);
    }
}

function collectNewJob(){
    new CollectNewJobUsecase().handle();
}

function collectNewJobDetail(){
    new CollectNewJobDetailUsecase().handle();
}