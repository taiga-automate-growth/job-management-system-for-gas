function testNotifyNewJob() {
  const accessToken = PropertiesService.getScriptProperties().getProperty('line-access-token');
  const line = new Line(accessToken);
  const repository = new JobRepository();
  const jobs = repository.findAll();
  line.notifyNewJob(jobs);

}

function testPushMessage(){
  const accessToken = PropertiesService.getScriptProperties().getProperty('line-access-token');
  const line = new Line(accessToken);
  const message = LineMessage.createTextMessage('やっほー');
  
  const userId = 'U75636e7098f9ec20dc1d6f3c353625c7';
  const send = line.apiClient.sendPush(userId, [message]);
  console.log(send);
}

[
  {
    "type":"template",
    "altText":"新規案件が6件あります",
    "template":{
      "type":"carousel",
      "columns":
      [
        {
          "text":"え",
          "actions":[
            {
              "type":"uri",
              "label":"詳細を見る"
            },
            {
              "type":"postback",
              "data":"action=generateSuggestion&id=",
              "label":"提案文を生成する"
            }
          ],
          "title":"あ"
        },
        {
          "text":"け",
          "actions":[
            {
              "type":"uri",
              "label":"詳細を見る"
            },
            {
              "type":"postback",
              "data":"action=generateSuggestion&id=",
              "label":"提案文を生成する"
            }
          ],
          "title":"か"
        },
        {
          "text":"せ",
          "actions":[
            {
              "type":"uri",
              "label":"詳細を見る"
            },
            {
              "type":"postback",
              "data":"action=generateSuggestion&id=",
              "label":"提案文を生成する"
            }
          ],
          "title":"さ"
        },
        {
          "text":"て",
          "actions":[
            {
              "type":"uri",
              "label":"詳細を見る"
            },
            {
              "type":"postback",
              "data":"action=generateSuggestion&id=",
              "label":"提案文を生成する"
            }
          ],
          "title":"た"
        },
        {
          "text":"ね",
          "actions":[
            {
              "type":"uri",
              "label":"詳細を見る"
            },
            {
              "type":"postback",
              "data":"action=generateSuggestion&id=",
              "label":"提案文を生成する"
            }
          ],
          "title":"な"
        },
        {
          "text":"へ",
          "actions":[
            {
              "type":"uri",
              "label":"詳細を見る"
            },
            {
              "type":"postback",
              "data":"action=generateSuggestion&id=",
              "label":"提案文を生成する"
            }
          ],
          "title":"は"
        }
      ]
    }
  }
]