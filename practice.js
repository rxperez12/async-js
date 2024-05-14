'use strict';

const BASE_URL = "http://numbersapi.com";

/**
 * Receive a number, log the text of the trivia
 */
async function showNumberTrivia(num) {

  const url = `${BASE_URL}/${num}`;
  const resp = await fetch(
    url,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }
  );
  const data = await resp.json(); // FIXME: improve the variable name with what's returned
  console.log(data.text);
}

// showNumberTrivia(12);

/**
 * Receive an array of nums, log the text of the trivia
 * from the first response
 */
async function showNumberRace(nums) {
  const promises = nums.map(function (num) {
    const url = `${BASE_URL}/${num}`;
    const promise = fetch(
      url,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }
    );
    return promise;
  });

  const firstResponse = await Promise.race(promises);
  const data = await firstResponse.json();
  console.log(data.text);
}

// showNumberRace([2, 4, 6, 5]);

/**
 * Receive an array of nums, log every response text if
 * successful; log error if failed
 */
async function showNumberAll(nums) {
  const promises = nums.map(function (num) { // NOTE: we are not awaiting anything
    const url = `${BASE_URL}/${num}`;
    const promise = fetch(
      url,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }
    );
    return promise;
  });

  const responses = await Promise.all(promises);   // FIXME: we should use Promise.allSettled() because we want thtem all back
  const successfulResults = [];
  const failedResults = [];

  for (const response of responses) { // NOTES: this is risky because we can't ensure what third API will send back for us to properly handle the errors
    if (response.status === 200) {
      const data = await response.json();
      successfulResults.push(data.text);
    } else {
      failedResults.push(`response failed with a status of ${response.status}`);
    }

  }

  console.log({ "successful": successfulResults, "failed": failedResults });
}

showNumberAll([13, 25, 31, "hey"]);

const array1 = [13, 25, 31, 478];
const array2 = [13, 25, 31, "hey"];

/**
 * Receive a num and 2 arrays, return the results of
 * showNumberTrivia, showNumberRace, showNumberAll
 */
async function main(num, numArray1, numArray2) {

  await showNumberTrivia(num);
  await showNumberRace(numArray1);
  await showNumberAll(numArray2);
}

// main(8, array1, array2);