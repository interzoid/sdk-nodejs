/**
 * The process defines the report or action that will occur with the dataset.
 * @enum {string} Process
 * @property {string} MATCH_REPORT - will generate a report of all found clusters of similar data.
 * @property {string} KEYS_ONLY - outputs a generated similarity key for every record in the dataset.
 * @property {string} GEN_SQL - similar to KEYS_ONLY, however it generates the SQL INSERT statements to store the
 * similarity keys in a database.
 * @property {string} CREATE_TABLE -  will create a new table in the source database with all the similarity keys
 * for each record in the source table, so they can be used for additional queries.
 */
export enum Process {
  MATCH_REPORT = 'matchreport',
  KEYS_ONLY = 'keysonly',
  GEN_SQL = 'gensql',
  CREATE_TABLE = 'createtable',
}
