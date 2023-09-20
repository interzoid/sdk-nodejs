/**
 * @enum {string} Source
 * @property {string} POSTGRES - Postgres
 * @property {string} MYSQL - MySQL
 * @property {string} SNOWFLAKE - Snowflake
 * @property {string} DATABRICKS - Databricks
 * @property {string} AWS_AURORA_POSTGRES - AWS Aurora Postgres
 * @property {string} AWS_AURORA_MYSQL - AWS Aurora MySQL
 * @property {string} AWS_RDS_POSTGRES - AWS RDS Postgres
 * @property {string} AWS_RDS_MYSQL - AWS RDS MySQL
 * @property {string} AWS_RDS_SQL_SERVER - AWS RDS SQL Server
 * @property {string} GOOGLE_SQL_CLOUD_POSTGRES - Google SQL Cloud Postgres
 * @property {string} GOOGLE_SQL_CLOUD_MYSQL - Google SQL CLoud MySQL
 * @property {string} MARIADB - MariaDB
 * @property {string} MARIADB_SKYSQL - MariaDB SkySQL
 * @property {string} MICROSOFT_SQL_SERVER - Microsoft SQL Server
 * @property {string} AZURE_SQL - Azure SQL
 * @property {string} AZURE_MYSQL - Azure MySQL
 * @property {string} COCKROACHDB - CockroachDB
 * @property {string} CSV_FILE - CSV File
 * @property {string} TSV_FILE - TSV File
 * @property {string} EXCEL_FILE - Excel File
 */
export enum Source {
  POSTGRES = 'Postgres',
  MYSQL = 'MySQL',
  SNOWFLAKE = 'Snowflake',
  DATABRICKS = 'Databricks',
  AWS_AURORA_POSTGRES = 'AWS Aurora Postgres',
  AWS_AURORA_MYSQL = 'AWS Aurora MySQL',
  AWS_RDS_POSTGRES = 'AWS RDS Postgres',
  AWS_RDS_MYSQL = 'AWS RDS MySQL',
  AWS_RDS_SQL_SERVER = 'AWS RDS SQL Server',
  GOOGLE_SQL_CLOUD_POSTGRES = 'Google SQL Cloud Postgres',
  GOOGLE_SQL_CLOUD_MYSQL = 'Google SQL CLoud MySQL',
  MARIADB = 'MariaDB',
  MARIADB_SKYSQL = 'MariaDB SkySQL',
  MICROSOFT_SQL_SERVER = 'Microsoft SQL Server',
  AZURE_SQL = 'Azure SQL',
  AZURE_MYSQL = 'Azure MySQL',
  COCKROACHDB = 'CockroachDB',
  CSV = 'CSV',
  TSV_FILE = 'TSV File',
  EXCEL_FILE = 'Excel File',
}
