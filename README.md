# node-infraprint

Access to the [Infraprint](https://infraprint.com/) [API](https://www.infraprint.com/docs).

Converted from the [node-stripe](https://github.com/abh/node-stripe) API by Ask Bjørn Hansen

## Installation

`npm install infraprint`

## Usage overview


    var api_key = 'abc';  // secret stripe API key
    var infraprint = require('infraprint')(api_key);

    infraprint.addresses.create(
       { 
		name:"John Doe",
		address_line1:"1234 Test Street",
		address_city:"Test",
		address_state:"NY",
		address_zip:"12345",
		address_country:"US"
	   },
       function(err, address) {
          if (err) {
             console.log("Couldn't create the address");
             return;
          }
          console.log("address id", address.id);
       }
     );


## API

All methods takes a callback as their last parameter. The callback is
called with an error code (if any) and then the response.

* `infraprint.addresses` - create, retrieve, delete and list addresses [address object](https://www.infraprint.com/docs#addresses)
   * `.create(address)` - create an address
   * `.retrieve(address_id)` - retrieve the given address
   * `.del(address_id)` - delete the given address
   * `.list(data)` - list addresses
* `infraprint.objects` - create, retrieve, delete and list print objects [print object format](https://www.infraprint.com/docs#objects)
   * `.create(object)` - create a print object
   * `.retrieve(object_id)` - retrieve a print object
   * `.del(object_id)` - delete a print object
   * `.list(count, offset)` - list print objects
* `infraprint.print_jobs` - create, retrieve and list print_jobs [print job format](https://www.infraprint.com/docs#jobs)
   * `.create(print_job)` - create a print job
   * `.retrieve(job_id)` - retrieve a print job by job id
   * `.list(count, offset)` - list print jobs
* `infraprint.settings` - [Paper Types](https://www.infraprint.com/docs#settings)
   * `.list()` - retrieve a list of paper settings and sizes
* `infraprint.packagings` - [Packagings](https://www.infraprint.com/docs#packagings)
   * `.list()` - retrieve a list of packagings
* `infraprint.services` - [Packagings](https://www.infraprint.com/docs#services)
   * `.list()` - retrieve a list of services

## Tests

To run the tests, install vows with `npm install vows` and then run

   INFRAPRINT_API=your-test-api-key vows test/*

## Author

Iain McQueen (iain@swiperoo.com)

## License

Copyright (C) 2013 Iain McQueen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
