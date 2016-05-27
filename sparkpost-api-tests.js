// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by sparkpost-api.js.
import { name as packageName } from "meteor/sparkpost-api";

// Write your tests here!
// Here is an example.
Tinytest.add('sparkpost-api - example', function (test) {
  test.equal(packageName, "sparkpost-api");
});
