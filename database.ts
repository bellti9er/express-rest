import { DataSource, QueryRunner } from "typeorm";

type ObjectLiteral = { [key: string]: any };
interface NotSelectResult { insertId: number; affectedRows: number; }
interface Action<T> { (queryRunner: QueryRunner): Promise<T> }

class QueryResultSet<T> {
  constructor(private result: T[] | NotSelectResult) {}

  fetchOne() {
    if(!Array.isArray(this.result)) throw new Error('RESULT_IS_NOT_ARRAY')

    const [row] = this.result;

    return row;
  }

  fetchAll() {
    if(!Array.isArray(this.result)) throw new Error('RESULT_IS_NOT_ARRAY')

    return this.result;
  }

  getLastInsertedId() {
    if(Array.isArray(this.result)) throw new Error('RESULT_IS_NOT_OBJECT')

    return this.result.insertId;
  }

  getAffectedNumRows() {
    if(Array.isArray(this.result)) throw new Error('RESULT_IS_NOT_OBJECT')

    return this.result.affectedRows;
  }
}

export default class Database {
  constructor(private db: DataSource) {
    this.db = db;
  }

  getConnection() {
    return this.db;
  }

  close() {
    return this.db.destroy();
  }

  private async queryWithNameParameter(query: string, params: ObjectLiteral) {
    const [escapedQuery, escapedParams] = this.db.driver.escapeQueryWithParameters(
      query,
      params,
      {}
    );

    return this.db.query(escapedQuery, escapedParams);
  }

  private async queryWithArrayParameter(query: string, params: any[]) {
    return this.db.query(query, params);
  }

  async query<T = any>(query: string, params: ObjectLiteral | any[] = []) {
    const result = Array.isArray(params)
      ? await this.queryWithArrayParameter(query, params)
      : await this.queryWithNameParameter(query, params)

    return new QueryResultSet<T>(result as T[] | NotSelectResult);
  }

  async withTransaction<T = any>(action: Action<T>) {
    const queryRunner = this.db.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await action(queryRunner);

      await queryRunner.commitTransaction();

      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async bulkInsert<T extends { [key: string]: any }>(
    { table, data } : { table: string; data: Array<T> }, 
    queryRunner     : QueryRunner | undefined = undefined
  ) {
    if (!data.length) return;
  
    const toSnakeCase = (str: string): string => {
      return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    };
  
    const columns = Object.keys(data[0]).map(toSnakeCase).join(', ');
  
    const values = data.map(row =>
      '(' + Object.keys(row).map(key => `'${row[key]}'`).join(', ') + ')'
    ).join(', ');
  
    const query = `INSERT INTO ${table} (${columns}) VALUES ${values};`;
  
    return (queryRunner || this.db).query(query);
  }
}
