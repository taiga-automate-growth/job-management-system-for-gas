// const crowdworks = new Crowdworks();

function testGetJobs(){
  const jobs = crowdworks.getJobs('GAS');
  console.log(jobs);
}

function testgetJobListContent(){
  const content = crowdworks.getJobListContent('GAS');
  console.log(content)
}

function testGetJobDetailContent(){
  const content = crowdworks.getJobDetailContent('11078928');
  console.log(content)
  // docPreview(content);
  return content;
}

function testGetJobTitle(){
  const jobDetailContent = testGetJobDetailContent();
  const jobTitle = crowdworks.getJobTitle(jobDetailContent);
  console.log(jobTitle);
}

function testGetJobDetail(){
  const jobDetailContent = testGetJobDetailContent();
  const jobDetail = crowdworks.getJobDetail(jobDetailContent);
  console.log(jobDetail);
}

function testGetDeadline(){
  const jobDetailContent = testGetJobDetailContent();
  const deadline = crowdworks.getDeadline(jobDetailContent);
  console.log(deadline);
}

function docPreview(docId, text){
  const doc = DocumentApp.openById(docId).getBody();
  doc.clear();
  doc.appendParagraph(text);
}