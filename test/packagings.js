var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');

var api_key = process.env.INFRAPRINT_API;

if (!api_key) {
    sys.puts('To run vows, you must have a INFRAPRINT_API environment variable with a test api key');
    process.exit(2)
}

var infraprint = require('./../lib/main.js')(api_key);

vows.describe("Packagings API").addBatch({
   'Packagings list' : {
       topic: function() {
           infraprint.packagings.list(this.callback);
       },
       'Got count': function(err, response) {
           assert.equal(response.object, 'list');
       },
   }
}).export(module, {error: false});
