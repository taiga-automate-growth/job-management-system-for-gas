class Line{
  constructor(accessToken){
    this.apiClient = LineBot.create(accessToken);
  }
  
  /**
   * @param {Array<Job>} jobs - 案件配列
   */
  notifyNewJob(jobs){
    const carousels = jobs.reduce((carousels, job) => {
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

      const carouselCount = carousels.size;

      if(carouselCount === 0){
        const carousel = LineMessage.createCarousel([column]);
        carousels.set(carouselCount + 1, carousel);
        return carousels;
      }
      
      const lastCarousel = carousels.get(carouselCount);
      console.log(lastCarousel.canAddColumn());
      if(lastCarousel.canAddColumn()){
        lastCarousel.addColumn(column);

      }else{
        const carousel = LineMessage.createCarousel([column]);
        carousels.set(carouselCount + 1, carousel);
      }

      return carousels;
    },new Map());

    const templates = []
    for(const carousel of carousels.values()){
      const columnCount = carousel.countColumns();
      const template = LineMessage.createTemplate(`新規案件が${columnCount}件あります`);
      template.setTemplate(carousel);
      templates.push(template);
    }
    const userId = 'U75636e7098f9ec20dc1d6f3c353625c7';
    const send = this.apiClient.sendPush(userId, templates);
  }
}