var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');

var api_key = process.env.INFRAPRINT_API;

if (!api_key) {
    sys.puts('To run vows, you must have a INFRAPRINT_API environment variable with a test api key');
    process.exit(2)
}

var infraprint = require('./../lib/main.js')(api_key);

vows.describe("Object API").addBatch({
   'Create Object' : {
        topic: function() {
        	infraprint.objects.create({
				name: "Sample",
				file: "https://www.infraprint.com/goblue.pdf",
				paper_type_id:"3",
				paper_size_id:"2",
				paper_color_id:"2"
			}, 
			this.callback);
        },
        'returns an object': function(err, response) {
            assert.isNull(err);
            assert.isDefined(response);
            assert.equal(response.object, 'object');
            assert.isDefined(response.id);
        },
        'Retrieve an Object' : {
            topic: function(create_err, ob) {
                infraprint.objects.retrieve(ob.id, this.callback);
            },
            'Got Object' : function(err, response) {
                assert.equal( response.name, 'Sample' );
            },
			'Delete an Object': {
				topic: function(err,gotObject){
					infraprint.objects.del(gotObject.id,this.callback);
				},
				'Removed item' : function(err,res){
					assert.isDefined(res.message);
				}
			}
        }
   },
   'Object list' : {
       topic: function() {
           infraprint.objects.list({}, this.callback);
       },
       'Got count': function(err, response) {
           assert.isNumber(response.count);
       },
   }
}).export(module, {error: false});
