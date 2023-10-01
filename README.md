# Interzoid Data Matching Node.js SDK

**Version: 1.1.0**

This is a Node.js SDK for Interzoid's Generative-AI powered data matching, data quality, data cleansing, and data normalization for organization and individual name data. Functions include the generation of similarity keys for identifying and matching inconsistent name data, as well as comparing and scoring data for matching purposes.

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
4. [Interzoid Cloud Data Connect](#cloud-data-connect)
   1. [Introduction](#introduction)
   2. [Matching Process](#matching-process)
   3. [Source](#source)
   4. [Category](#category)
   5. [Connection Strings](#connection-strings)
   6. [Match and write results to a new table](#match-and-write-results-to-a-new-table)
   7. [Match Key Report for a cloud database table](#match-key-report-for-a-cloud-database-table)
   8. [Delimited File Match Key Report](#delimited-file-match-key-report)
5. [Interzoid Account Information (Remaining Credits)](#account-information)
--- 

## API Key

Please visit https://www.interzoid.com/register-api-account to register for an API key and receive free usage credits. 

---

## Installation
The Interzoid SDK requires [Node.js](https://nodejs.org/) v14 or greater.

```shell
npm install @interzoid/data-matching
```

---

## Data Matching APIs
Interzoid uses algorithmically generated similarity keys leveraging Generative AI, Large Language Models (LLMs) and Machine Learning to intelligently match data within or across data sources.

To learn more about the technology behind these APIs, please visit https://docs.interzoid.com/entries/understanding-data-matching

### Match Key Functions

#### Full Name Match Key
This API provides a hashed similarity key from the input data used to match with other similar full name data. Use the generated similarity key, rather than the actual data itself, to match and/or sort individual name data by similarity. This avoids the problems of data inconsistency, misspellings, and name variations when matching within a single dataset, and can also help matching across datasets or for more advanced searching.

```typescript
import { getFullNameMatchKey } from '@intezoid/data-matching';

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
import { getCompanyNameMatchKey } from '@intezoid/data-matching';

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
import { getAddressMatchKey } from '@intezoid/data-matching';

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
import { getFullNameMatchScore } from '@intezoid/data-matching';

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
import { getOrganizationMatchScore } from '@intezoid/data-matching';

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

## Cloud Data Connect

### Introduction

Interzoid's Cloud Data Connect is a set of functions that allow you to match data in your cloud database or delimited text file such as CSV and TSV with Interzoid's data matching algorithms.


### Matching Process

The `process` parameter determines the type of matching process to run. The package provides an `enum` called [`Process`](src/interfaces/Process.ts) that contains the available options.

| Process                | Description                                                                                                                                              |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Process.MATCH_REPORT` | Generate a report of all found clusters of similar data.                                                                                                 |
| `Process.CREATE_TABLE` | Creates a new table in the source database with all the similarity keys for each record in the source table, so they can be used for additional queries. |
| `Process.GEN_SQL`      | Generate the SQL INSERT statements to store the similarity keys in a database.                                                                           |
| `Process.KEYS_ONLY`    | Output a generated similarity key for every record in the dataset.                                                                                       |


### Source

The `source` parameter determines the type of data source you're matching. The package provides an `enum` called [`Source`](src/interfaces/Source.ts) that contains the available options. Some commonly used examples are:

| Source              | Description                          |
|---------------------|--------------------------------------|
| `Source.MYSQL`      | Match data in a MySQL database.      |
| `Source.POSTGRES`   | Match data in a PostgreSQL database. |
| `Source.MARIADB`    | Match data in a MariaDB database.    |
| `Source.DATABRICKS` | Match data in a Databricks table.    |
| `Source.CSV`        | Match data in a CSV file.            |

Please see the [source code](src/interfaces/Source.ts) for a complete list of available options.


### Category

The `category` parameter determines the type of data you're matching. The package provides an `enum` called [`Category`](src/interfaces/Category.ts) that contains the available options.

| Category            | Description             |
|---------------------|-------------------------|
| `Category.COMPANY`  | Match company names.    |
| `Category.FULLNAME` | Match individual names. |
| `Category.ADDRESS`  | Match addresses.        |

### Connection Strings

The `connection` parameter is a connection string for your database. The format of the connection string depends on the database you're connecting to. 

Please see [this page](https://connect.interzoid.com/connection-strings) for examples of connection strings for various databases.

### Match and write results to a new table

Set the `process` parameter to `CREATE_TABLE` to create a new table in your database with the match keys. The `newTable` parameter is the name of the new table to create. This table will be created by the process, and will contain the original data and the similarity key. 

Don't create the table yourself, the process will create it for you. 

You'll have to grant the user you're connecting with the ability to create a new table in the database in addition to the ability to read from the table you're matching.

```typescript
import { getCloudDatabaseMatchKeyReport, Process, Category, Source } from '@intezoid/data-matching';

async function databaseMatchKeyReport() {
   const result = await getCloudDatabaseMatchKeyReport({
      apiKey: 'your-interzoid-api-key',
      process: Process.CREATE_TABLE,
      category: Category.COMPANY,
      source: Source.MYSQL,
      connection: 'db_user:db_password@tcp(db_host)/database',
      table: 'companies',                 // table to match
      column: 'companyname',              // column to match
      reference: 'id',                    // optional reference column
      newTable: 'companies_match_keys'    // new table to create
   });
   console.log(result);
}
```

#### Response
```
"Creating new table...Table companies_match_keys created successfully."
```

---

### Match Key Report for a cloud database table

#### Response options

* Set `json` to `true` to return a JSON object with arrays of match clusters.
* Set `html` to `true` to return results in plain text with clusters separated by html `<br>` tags.
* Don't set either to return results in plain text with clusters separated by newlines.

```typescript
import { getCloudDatabaseMatchKeyReport, Source, Process, Category } from '@intezoid/data-matching';

async function databaseMatchKeyReport() {
   const result = await getCloudDatabaseMatchKeyReport({
      apiKey: 'your-interzoid-api-key',
      process: Process.MATCH_REPORT,
      category: Category.COMPANY,
      source: Source.MYSQL,
      connection: 'db_user:db_password@tcp(db_host)/database',
      table: 'companies',
      column: 'companyname',
      reference: 'id',
      json: true,
   });
   console.log(JSON.stringify(result, null, 2));
}
```

#### Sample Response

```json
{
  "Status": "success",
  "Message": "",
  "MatchClusters": [
    [
      {
        "Data": "Cisco",
        "Reference": "",
        "SimKey": "3AmCGk2yvEJ7XUxUmB3dFHxRiVzy4Squ89J-4_lDrxQ"
      },
      {
        "Data": "Cisco Systems",
        "Reference": "30",
        "SimKey": "3AmCGk2yvEJ7XUxUmB3dFHxRiVzy4Squ89J-4_lDrxQ"
      }
    ],
    [
      {
        "Data": "Netflix",
        "Reference": "15",
        "SimKey": "8c6BY0KP9MYiDezQaKL3bH3iHfDU2wCMMTD9v0EeZJ8"
      },
      {
        "Data": "\"Netflix, Inc.\"",
        "Reference": "34",
        "SimKey": "8c6BY0KP9MYiDezQaKL3bH3iHfDU2wCMMTD9v0EeZJ8"
      }
    ]
  ]
 }
```

---

### Delimited File Match Key Report

Provide a URL to a delimited file (CSV or TSV) and the API will return a match key report for the data in the file.

```typescript
import { getDelimitedFileMatchKeyReport, Process, Source, Category } from '@intezoid/data-matching';

async function csvFileMatchReport() {
   const result = await getDelimitedFileMatchKeyReport({
      apiKey: 'your-interzoid-api-key',
      process: Process.MATCH_REPORT,
      category: Category.COMPANY,
      source: Source.CSV,
      table: Source.CSV,
      connection: 'https://dl.interzoid.com/csv/companies.csv',
      column: '1',          // column number to match
      json: true,
   });
   console.log(JSON.stringify(result, null, 2));
}

```

#### Result

```json
{
  "Status": "success",
  "Message": "",
  "MatchClusters": [
    [
      {
        "Data": "Good Year Tire & Rubber",
        "Reference": "",
        "SimKey": "140xAiUxvDysV56LZzogzDwLuYLd2U7E5sVAXd1nKd8"
      },
      {
        "Data": "Goodyear Tire Inc",
        "Reference": "Transportaions",
        "SimKey": "140xAiUxvDysV56LZzogzDwLuYLd2U7E5sVAXd1nKd8"
      }
    ],
    [
      {
        "Data": "Pederson Tooling Inc.",
        "Reference": "Transportaions",
        "SimKey": "7oOMieCdoyxjt7_oKbE2xGngnZGdG75CFU5pEfhU5z8"
      },
      {
        "Data": "Peterson Tools",
        "Reference": "Services",
        "SimKey": "7oOMieCdoyxjt7_oKbE2xGngnZGdG75CFU5pEfhU5z8"
      }
    ]
  ]
}
```

---

## Account Information

This API retrieves the current amount of remaining purchased (or trial) credits for a license key.

Using this function does **not** deduct credits from your account.

```typescript
import { getRemainingCredits } from '@intezoid/data-matching';

async function remainingCredits() {
  const result = getRemainingCredits({apiKey: 'your-interzoid-api-key'});
    console.log(result);
}
```

#### Result
```json
{
  "credits": "9998",
  "code": "Success"
}
```
