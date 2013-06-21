var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');

var api_key = process.env.INFRAPRINT_API;

if (!api_key) {
    sys.puts('To run vows, you must have a INFRAPRINT_API environment variable with a test api key');
    process.exit(2)
}

var infraprint = require('./../lib/main.js')(api_key);

vows.describe("Addresses").addBatch({
    'Create charge' : {
        topic: function() {
            infraprint.addresses.create({
     			name: "Iain McQueen",
				address_line1: "1234 Test St",
				address_city:"Stamford",
				address_state: "CT",
				address_zip:"12345",
				address_country:"US"
            }, this.callback);
        },
        'returns an address' : function(err, response) {
            assert.isNull(err);
            assert.isDefined(response);
            assert.equal(response.object, 'address');
            assert.isDefined(response.id);
        },
        'Retrieve an address' : {
            topic: function(create_err, address) {
                infraprint.addresses.retrieve(address.id, this.callback);
            },
            'Got an address' : function(err, response) {
                assert.isNull(err);
                assert.isDefined(response);
                assert.equal(response.object, 'address');
                assert.isDefined(response.id);
            },
        },
        'Delete and address' : {
            topic: function(create_err, address) {
                infraprint.addresses.del(address.id, this.callback);
            },
            'Removed Address' : function(err, response) {
                assert.isNull(err);
                assert.isDefined(response);
                assert.isDefined(response.message);
            },
        }
    },
    'Address list' : {
        topic: function() {
            infraprint.addresses.list({}, this.callback);
        },
        'Got count': function(err, response) {
            assert.isNumber(response.count);
        },
    }
}).export(module, {error: false});