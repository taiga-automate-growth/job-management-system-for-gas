const lancers = new Lancers();

function testgetJobListContent(){
  const content = lancers.getJobListContent('GAS');
  console.log(content);
  // docPreview(content);
}

function testGetJobNumbers(){
  const content = lancers.getJobListContent('');
  const numbers = lancers.getJobNumbers(content);
  console.log(numbers);
}

function testGetJobDetailContent(){
  const content = lancers.getJobDetailContent('5013643');
  // docPreview('1zFyjz6xTJ-4p3E-aOHfkrdM7UEzaQ_Jsjb5Q_e80gdw', content);
  docPreview('1-8H6oA7bl8hVlGbhhlJvRyBqHFRPjgSk_RuW91P3UHg',content);
}

function testGetJobDetail(){
  const content = lancers.getJobDetailContent('5072014');
  const jobDetail = lancers.getJobDetail(content);
  console.log(jobDetail);
}

function phantomjs(){
  const phantomJsCloud = new PhantomJsCloud.create('ak-de1bk-a75m1-c7shb-jaqb3-s23yw');
  const phantom = new PhantomJsCloud.create()
  console.log(phantomJsCloud);
}