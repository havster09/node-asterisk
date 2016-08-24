/**
 * port:  port server
 * host: host server
 * username: username for authentication
 * password: username's password for authentication
 * events: this parameter determines whether events are emited.
 **/
var ami = new require('asterisk-manager')(5038,'127.0.0.1','admin','1234', true);

// In case of any connectiviy problems we got you coverd.
ami.keepConnected();

// Listen for any/all AMI events.
ami.on('managerevent', function(evt) {
    console.log('managerevent');
});

// Listen for specific AMI events. A list of event names can be found at
// https://wiki.asterisk.org/wiki/display/AST/Asterisk+11+AMI+Events
ami.on('hangup', function(evt) {
    console.log(evt);
});
ami.on('confbridgejoin', function(evt) {
    console.log(evt);
});

// Listen for Action responses.
ami.on('response', function(evt) {
    console.log('response');
});

// Perform an AMI Action. A list of actions can be found at
// https://wiki.asterisk.org/wiki/display/AST/Asterisk+11+AMI+Actions
ami.action({
    'action':'originate',
    'channel':'SIP/haven',
    'context':'time',
    'exten':11,
    'priority':1,
    'variable':{
        'name1':'value1',
        'name2':'value2'
    }
}, function(err, res) {
    console.log('action callback');
});
