function doPost(e){
    const accessToken = PropertyService.getScriptProperties().getProperty('line-access-token');
    const line = this.line.create(accessToken);
    const webHookEvent = line.receiveEvent(e);
    const senderId = webHookEvent.getSenderId();
    line.loading(senderId, 60);

    if(webHookEvent.isPostbackEvent()){
        const postbackData = webHookEvent.getPostbackData();
        const replyToken = webHookEvent.getReplyToken();

        if(postbackData.action === 'generateSuggestion'){
            new GenerateSuggestionUsecase().handle(postbackData,replyToken);
        }
    }
}