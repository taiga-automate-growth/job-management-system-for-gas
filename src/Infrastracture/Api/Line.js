class Line{
  constructor(accessToken){
    this.apiClient = LineBot.create(accessToken);
  }
  
  /**
   * @param {Map<number,Job>} jobs - 案件配列
   */
  notifyNewJob(jobs){
    let jobCount = `${jobs.size}件`;
    const carousels = new Map();
    
    for(const job of jobs.values()){
      const title = job.getTitle();
      const site = job.getSite();
      const column = LineMessage.createColumn(site);
      column.setTitle(title);

      const url = job.getUrl();
      const viewDetailAction = LineMessage.createUriAction(url);
      viewDetailAction.setLabel('詳細を見る');
      column.addAction(viewDetailAction);

      const id = job.getId();
      const generateSuggestionAction = LineMessage.createPostbackAction(`action=generateSuggestion&id=${id}`);
      column.addAction(generateSuggestionAction);
      generateSuggestionAction.setLabel('提案文を生成する');
      
      if(!carousels.has('last')){
        const carousel = LineMessage.createCarousel([column]);
        carousels.set('last',carousel);
        continue;
      }else{
        const carousel = carousels.get('last');
        if(carousel.canAddColumn()){
          carousel.addColumn(column);
          continue;
        }else{
          const key = carousels.size;
          carousel.delete('last');
          carousels.set(key,carousel);
          const newCarousel = LineMessage.createCarousel([column]);
          carousels.set('last',newCarousel);
        }
      }
    }
    
    const messagesList = [];
    for(const [key,carousel] of carousels){
      if(key !== 'last'){
        jobCount = '';
      }
      const template = LineMessage.createTemplate(`新規案件が${jobCount}あります`);
      template.setTemplate(carousel);
    
      const messagesListCount = messagesList.length;
      if(messagesListCount === 0){
        messagesList.push([template]);
        continue;
      }
    
      const lastMessages = messagesList[messagesListCount - 1];
      const lastMessagesCount = lastMessages.length;
      if(lastMessagesCount <= 5){
        lastMessages.push(template);
      }else{
        messagesList.push([template]);
      }
    }
    
    messagesList.forEach(messages => {
      const userId = 'U75636e7098f9ec20dc1d6f3c353625c7';
      const send = this.apiClient.sendPush(userId, messages);
      console.log(send);
    });
  }
}