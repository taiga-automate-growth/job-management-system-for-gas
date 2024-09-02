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
      const deadline = `締切：${job.getDeadline()}`;
      const column = LineMessage.createColumn(deadline);
      column.setTitle(title);

      if(job.isCrowdWorks()){
        column.setThumbnail('https://i.ibb.co/KyZ1NXF/crowdworks-logo.png','#fffff');
      }

      if(job.isLancers()){
        column.setThumbnail('https://i.ibb.co/3vsVKRV/lancers-logo.png','#fffff');
      }

      const url = job.getUrl();
      const defaultAction = LineMessage.createUriAction(url);
      column.setDefaultAction(defaultAction);

      const id = job.getId();
      const generateSuggestionAction = LineMessage.createPostbackAction(`action=generateSuggestion&id=${id}`);
      generateSuggestionAction.setLabel('提案文を生成する');
      column.addAction(generateSuggestionAction);

      const notSuggestAction = LineMessage.createPostbackAction(`action=cancelSuggestion&id=${id}`);
      notSuggestAction.setLabel('提案しない');
      column.addAction(notSuggestAction);

      const appSheetUrl = 'https://www.appsheet.com/newshortcut/d9c3ee91-e6c7-4a13-8528-d561663b2714'
      const openAppSheetAction = LineMessage.createUriAction(appSheetUrl);
      openAppSheetAction.setLabel('AppSheetを開く');
      column.addAction(openAppSheetAction);
      
      if(!carousels.has('last')){
        const carousel = LineMessage.createCarousel([column]);
        carousel.setImageSize("contain");
        carousels.set('last',carousel);
        continue;
      }else{
        const carousel = carousels.get('last');
        if(carousel.canAddColumn()){
          carousel.setImageSize("contain");
          carousel.addColumn(column);
          continue;
        }else{
          const key = carousels.size;
          carousels.delete('last');
          carousels.set(key,carousel);
          const newCarousel = LineMessage.createCarousel([column]);
          newCarousel.setImageSize("contain");
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
      const userId = PropertiesService.getScriptProperties().getProperty('line-user-id');
      const send = this.apiClient.sendPush(userId, messages);
      console.log(send);
    });
  }

  /**
   * 提案文を送信する
   */
  sendSuggestion(suggestion,replyToken){
    const message = LineMessage.createTextMessage(suggestion);
    this.apiClient.reply(replyToken,[message]);
  }

  /**
   * 提案キャンセル成功を報告する
   */
  canceledSuggestionComplete(job,replyToken){
    const title = job.getTitle();
    const text = `以下案件の提案をキャンセルしました\n${title}`;
    const message = LineMessage.createTextMessage(text);
    this.apiClient.reply(replyToken,[message]);
  }
}