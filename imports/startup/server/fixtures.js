import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import moment from 'moment';
import { Bets } from '../../api/bets/bets';
import { Sports } from '../../api/sports/sports';
import { Markets } from '../../api/markets/markets';
import { Events } from '../../api/events/events';
import { Competitions } from '../../api/competitions/competitions';

const users = [{
  email: 'sean@sean.com',
  password: 'sean',
  profile: {
    name: { first: 'Sean', last: 'Chamberlain' },
    bankroll: { balance: 0 },
  },
  username: 'seanchamberlain',
  roles: ['admin'],
}];

users.forEach(({ email, password, profile, roles, username }) => {
  const userExists = Meteor.users.findOne({ 'emails.address': email });

  if (!userExists) {
    const userId = Accounts.createUser({ email, password, profile, username });
    Roles.addUsersToRoles(userId, roles);
  }
});

const sports = [{
  name: 'Basketball',
  competitions: [{
    name: 'NBA',
  }, {
    name: 'NBL'
  }, {
    name: 'NCAA'
  }],
  events: [{
    homeTeam: 'Cleveland Cavaliers',
    awayTeam: 'Golden State Warriors'
  }, {
    homeTeam: 'Charlotte Hornets',
    awayTeam: 'New Orleans Pelicans'
  }, {
    homeTeam: 'San Antonio Spurs',
    awayTeam: 'Los Angeles Clippers'
  }],
  markets: [{
    name: 'Tournament Win'
  }, {
    name: 'Halftime Handicap'
  }, {
    name: 'Fulltime Handicap'
  }]
}, {
  name: 'Soccer',
  competitions: [{
    name: 'Premier League'
  }, {
    name: 'La Liga'
  }, {
    name: 'Seria A'
  }, {
    name: 'Bundesliga'
  }],
  events: [{
    homeTeam: 'Chelsea',
    awayTeam: 'Manchester United'
  }, {
    homeTeam: 'West Brom Albion',
    awayTeam: 'Leicester City'
  }, {
    homeTeam: 'Manchester City',
    awayTeam: 'Everton'
  }],
  markets: [{
    name: 'Tournament Win'
  }, {
    name: 'Halftime Handicap'
  }, {
    name: 'Fulltime Handicap'
  }]
}, {
  name: 'Football',
  competitions: [{
    name: 'AFL'
  }],
  events: [{
    homeTeam: 'Port Adelaide Power',
    awayTeam: 'Adelaide Crows'
  }, {
    homeTeam: 'Greater Western Sydney Giants',
    awayTeam: 'Sydney Swans'
  }, {
    homeTeam: 'Hawthorn Hawks',
    awayTeam: 'Melbourne Demons'
  }],
  markets: [{
    name: 'Tournament Win'
  }, {
    name: 'Halftime Handicap'
  }, {
    name: 'Fulltime Handicap'
  }]
}];

sports.forEach(({ name, competitions, events, markets }) => {
  
  const sportExists = Sports.findOne({ name: name });
  const sportName = name;
  
  if (!sportExists) {
    const sportId = Sports.insert({ name: name });
    
    competitions.forEach(({ name }) => {
      
      const competitionExists = Competitions.findOne({ 'sport._id': sportId, name: name });
      
      if (!competitionExists) {
        Competitions.insert({ sport: { _id: sportId, name: sportName }, name: name });
      }
    });
    
    events.forEach(({ homeTeam, awayTeam }) => {
      
      const eventExists = Events.findOne({ 'sport._id': sportId, 'teams.home': homeTeam, 'teams.away': awayTeam });
      const eventName = homeTeam + ' v ' + awayTeam;
      
      if (!eventExists) {
        Events.insert({ name: eventName, sport: { _id: sportId, name: sportName } });
      }
    });
    
    markets.forEach(({ name }) => {
      
      const marketExists = Markets.findOne({ 'sport._id': sportId, name: name });
      
      if (!marketExists) {
        Markets.insert({ sport: { _id: sportId, name: sportName }, name: name });
      }
    });
  }
});
