const fetch = require("node-fetch");

async function testEndpoint(url) {
  try {
    console.log(`Testing ${url}...`);
    const response = await fetch(url);
    const status = response.status;
    const text = await response.text();
    console.log(`Status: ${status}`);
    console.log(
      `Response: ${text.substring(0, 100)}${text.length > 100 ? "..." : ""}`
    );
    console.log("---");
  } catch (error) {
    console.error(`Error accessing ${url}: ${error.message}`);
    console.log("---");
  }
}

async function runTests() {
  await testEndpoint("http://localhost:4000/");
  await testEndpoint("http://localhost:4000/api");
  await testEndpoint("http://localhost:4000/api/songs");
  await testEndpoint("http://localhost:4000/api/favorites");
}

runTests();
