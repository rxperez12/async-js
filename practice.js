'use strict';

const BASE_URL = "http://numbersapi.com";

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
  const data = await resp.json();
  console.log(data.text);
}

// showNumberTrivia(8);

async function showNumberRace(nums) {
  const promises = nums.map(async function (num) {
    const url = `${BASE_URL}/${num}`;
    const resp = fetch(
      url,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }
    );
    return resp;
  });

  const answerPromises = await Promise.race(promises);
  const resp = await answerPromises.json();
  console.log(resp.text);
}
const numbers = [13, 25, 31, 478];

showNumberRace(numbers)

