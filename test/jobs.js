var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');

var api_key = process.env.INFRAPRINT_API;

if (!api_key) {
    sys.puts('To run vows, you must have a INFRAPRINT_API environment variable with a test api key');
    process.exit(2)
}

var infraprint = require('./../lib/main.js')(api_key);

vows.describe("Jobs API").addBatch({
   'Create Print Job' : {
        topic: function() {
			var that = this;
        	infraprint.objects.create({
				name: "SampleObject",
				file: "https://www.infraprint.com/goblue.pdf",
				setting_id:"201"	
			},
			function(e, ob){
				assert.isNull(e);
				infraprint.print_jobs.create({
					name: "Sample",
					to: {
						name: "John Doe",
						address_line1: "1234 Test St",
						address_city: "Stamford",
						address_state: "CT",
						address_zip: "06905",
						address_country: "US"
					},
					from: {
						name: "Jane Doe",
						address_line1: "12345 Test St",
						address_city: "Greenwich",
						address_state: "CT",
						address_zip: "06831",
						address_country: "US"
					},
					object1:ob.id,
					packaging_id:1
				}, that.callback)
			  });
        },
        'returns a Print Job': function(err, response) {
            assert.isNull(err);
            assert.isDefined(response);
            assert.equal(response.object, 'job');
            assert.isDefined(response.id);
        },
        'Retrieve a Print Job' : {
            topic: function(create_err, ob) {
                infraprint.print_jobs.retrieve(ob.id, this.callback);
            },
            'Got Object' : function(err, response) {
                assert.equal( response.name, 'Sample' );
            }
        }
   },
   'Job list' : {
       topic: function() {
           infraprint.print_jobs.list({}, this.callback);
       },
       'Got count': function(err, response) {
           assert.isNumber(response.count);
       },
   }
}).export(module, {error: false});
