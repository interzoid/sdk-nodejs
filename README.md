# interzoid-sdk-typescript

#### Table of Contents
1. [API Key](#api-key)
2. [Installation](#installation)
3. [Data Matching APIs](#data-matching-apis)
   1. [Match Key Functions](#match-key-functions)
      1. [Full Name Match Key](#full-name-match-key)
      2. [Company Name Match Key](#company-name-match-key)
      3. [Address Match Key](#address-match-key)
   2. [Match Score Functions](#match-score-functions)
      1. [Full Name Match Score](#full-name-match-score)
      2. [Organization Name Match Score](#organization-name-match-score)
   3. [Interzoid Account Information (Remaining Credits)](#account-information)

--- 

## API Key

Please visit https://www.interzoid.com/register-api-account to register for an API key. 

---

## Installation
The Interzoid SDK requires [Node.js](https://nodejs.org/) v14 or greater.

```shell
npm install interzoid
```

---

## Data Matching APIs
Interzoid uses algorithmically generated similarity keys leveraging Generative AI, Large Language Models (LLMs) and Machine Learning to intelligently match data within or across data sources.

To learn more about the technology behind these APIs, please visit https://docs.interzoid.com/entries/understanding-data-matching

### Match Key Functions

#### Full Name Match Key
This API provides a hashed similarity key from the input data used to match with other similar full name data. Use the generated similarity key, rather than the actual data itself, to match and/or sort individual name data by similarity. This avoids the problems of data inconsistency, misspellings, and name variations when matching within a single dataset, and can also help matching across datasets or for more advanced searching.

```typescript
import { getFullNameMatchKey } from 'interzoid';

async function fullNameMatch() {
    const result = await getFullNameMatchKey({apiKey: 'your-interzoid-api-key', fullName: 'John Smith'});
    console.log('result');
}
```

##### Result
```json
{
  "simKey": "N1Ai4RfV0SRJf2dJwDO0Cvzh4xCgQG",
  "code": "Success",
  "credits": "9999"
}
```

---

#### Company Name Match Key

This API provides a hashed similarity key from the input data used to match with other similar company name data. Use the generated similarity key, rather than the actual data itself, to match and/or sort company name data to identify inconsistently represented company and organization name data. This avoids the problems of data inconsistency, misspellings, and name variations when matching within a single dataset or across multiple data sources.

The optional `algorithm` parameter provides multiple matching algorithms:

- `wide` will find a greater number of matches, but may also find similarly-spelled false positives. 
- `narrow` will result in tighter matching requirements, but then may miss a few matches. 
- `medium` is a balance between the two.
- Your business case will dictate which algorithm is ideal.
- The default value for the optional `algorithm` parameter is `wide`. 

```typescript
import { getCompanyNameMatchKey } from 'interzoid';

async function companyNameMatch() {
    const result = await getCompanyNameMatchKey({apiKey: 'your-interzoid-api-key', company: 'Microsoft', algorithm: 'medium'});
    console.log(result);
}
```
##### Result
```json
{
  "simKey": "cZdRqd6Ya6FBDPmFpn4_USiTu2DVoYO32ANw1Z5NYN0",
  "code": "Success",
  "credits": "9999"
}
```

---

#### Address Match Key
This API provides a hashed similarity key from the input data used to match with other similar address data. Use the generated similarity key, rather than the actual data itself, to match and/or sort address data by similarity. This avoids the problems of data inconsistency, misspellings, and address element variations when matching either withing a single dataset, or across datasets. It also provides for broader searching capabilities.

You can choose from two matching algorithms, `wide` and `narrow`. 
- `narrow` considers a unit number (suite, apartment, unit, etc.) when generating similarity keys. This ensures individual units are identified separately when comparing generated keys.
- `wide` parameter will not consider the unit numbers, generating matching similarity keys based on the primary address only.
- The default value for the optional `algorithm` parameter is `narrow`. 

```typescript
import { getAddressMatchKey } from 'interzoid';

async function addressMatch() {
  const result = await getAddressMatchKey({apiKey: 'your-interzoid-api-key', address: '500 main street', algorithm: 'narrow'});
    console.log(result);
}
```

##### Result
```json
{
  "simKey": "T8O0ROaEgJIFhqcgg7SyCBjRryRVa43oMO2sMlq9r0s",
  "code": "Success",
  "credits": "9999"
}
```

---

### Match Score Functions

We provide 2 operations for match scoring: Organization name and Full name. The request params for these operations are identical--provide 2 values and the API returns a matching score.


#### Full Name Match Score
This API provides a match score (likelihood of matching) between two individual names on a scale of 0-100, where 100 is the highest possible match.
    
```typescript
import { getFullNameMatchScore } from 'interzoid';

async function fullNameMatchScore() {
  const result = await getFullNameMatchScore({apiKey: 'your-interzoid-api-key', value1: 'John Smith', value2: 'John Smyth'});
    console.log(result);
}
```

##### Result
```json
{
  "score": "80",
  "code": "Success",
  "credits": "9999"
}
```

---

#### Organization Name Match Score
This API provides a match score (likelihood of matching) from 0-100 between two organization names.

```typescript
import { getOrganizationMatchScore } from 'interzoid';

async function organizationNameMatchScore() {
  const result = await getOrganizationNameMatchScore({apiKey: 'your-interzoid-api-key', value1: 'Apple', value2: 'Apple Inc.'});
    console.log(result);
}
```

##### Result
```json
{
  "score": "95",
  "code": "Success",
  "credits": "9998"
}
```

---

#### Account Information

This API retrieves the current amount of remaining purchased (or trial) credits for a license key.

Using this function does **not** deduct credits from your account.

```typescript
import { getRemainingCredits } from 'interzoid';

async function remainingCredits() {
  const result = getRemainingCredits({apiKey: 'your-interzoid-api-key'});
    console.log(result);
}
```

##### Result
```json
{
  "credits": "9998",
  "code": "Success"
}
```

