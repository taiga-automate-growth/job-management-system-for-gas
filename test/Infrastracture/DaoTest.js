function testGet() {
  const dao = new DAO('jobs');
  const requires = [
    {
      column: 'title',
      operand: '=',
      values: ['あ','た']
    },
    {
      column: 'is_suggest',
      operand: '=',
      values: [true]
    }
  ]
  const data = dao.get(requires);
  console.log(data);
}

function testSet(){
  const dao = new DAO('jobs');
  const data = [
    ['','','な','に','ぬ','ね','の',''],
    ['','','は','ひ','ふ','へ','ほ','']
  ];
  dao.set(data)
}
