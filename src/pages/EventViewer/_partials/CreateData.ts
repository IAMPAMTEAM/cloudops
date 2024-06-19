import GetTime from '@/pages/EventViewer/_partials/GetTime';

var status = ['OK', 'ALERT'];
var where = ['elb-seoul-web', 'elb-seoul-api', 'elb-seoul-batch'];
var who = ['3.12.3.101 (south korea)'];
var what = ['ssh login', 'sudo command', 'root login'];
var team = ['hybrix', 'AI', 'frontend', 'backend', 'infra', 'security', 'devops', 'cloudops'];
var MIN_COUNTS = 1;
var MAX_COUNTS = 30;

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function CreateData() {
  var count = Math.floor(Math.random() * 3) + 1;
  var date = GetTime().date;
  var time = GetTime().time;

  var newData: any[] = [];

  for (var i = 0; i < count; i++) {
    var randomStatus = status[Math.floor(Math.random() * status.length)];
    var randomWhere = where[Math.floor(Math.random() * where.length)];
    var randomWho = who[Math.floor(Math.random() * who.length)];
    var randomWhat = what[Math.floor(Math.random() * what.length)];
    var randomTeam = team[Math.floor(Math.random() * team.length)];

    var data = {
      status: randomStatus,
      date: date,
      time: time,
      where: randomWhere,
      who: randomWho,
      what: randomWhat,
      counts: randomBetween(MIN_COUNTS, MAX_COUNTS),
      team: randomTeam,
    };

    newData.push(data);
  }
  return newData;
}
