var assert = require("node-assertthat"),
	moment = require("moment"),
	verify = require("./constraints").verify;

suite("when verify is called with a mapping", function() {
	suite("without constraints", function() {
		test("the mapping is returned", function() {
			var mapping = { "foo" : "bar" },
				expected = mapping;
			var actual = verify(mapping);
			assert.that(actual, is.equalTo(expected));
		});
	});
	suite("with a valid validBefore constraint", function() {
		test("and the given datetime is in the future the mapping is returned.", function() {
			var mapping = {
					"foo" : "bar",
					"constraints" : {
						"validBefore" : [ moment(Date.UTC.apply({},[2099, 01, 01, 23, 59, 59])) ]
					}
				},
				expected = mapping;
			var actual = verify(mapping);
			console.log("actual", actual, actual.constraints);
			console.log("expected", expected, expected.constraints);
			assert.that(actual, is.equalTo(expected));
		});	
		test("and the given datetime is in the past undefined is returned.");
	});
	suite("with a valid validFrom constraint", function() {
		test("and the given datetime is in the future undefined is returned.");
		test("and the given datetime is in the past the mapping is returned.");
	});
	suite("with more than one constraint", function() {
		test("and all constraints are valid the mapping is returned");
		test("and at least one constraint is not valid undefined is returned.");
	});
});

suite("when verify is called without a mapping", function() {
	test("then always undefined is returned", function() {
		assert.that(verify(), is.equalTo(undefined));
	})
});
