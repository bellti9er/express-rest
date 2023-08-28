import 'dotenv/config'
import { DataSource } from 'typeorm'
import { Express    } from 'express'

import App            from '../app'
import { Database   } from '../api'

type DatabaseType = 'mysql' | 'postgres'

export class TestClient {

  private static _instance : TestClient
  private _app!            : Express
  private _database!       : Database
  private _dataSource!     : DataSource

  private constructor() { }

  static get instance(): TestClient {
    return TestClient._instance || (TestClient._instance = new TestClient())
  }

  get app(): Express {
    return this._app
  }
  
  get database(): Database {
    return this._database
  }

  get connection(): DataSource {
    return this._dataSource
  }

  async setUp() {
    this._dataSource = await new DataSource({
      type : process.env.TEST_DB_TYPE! as DatabaseType,
      host : process.env.TEST_DB_HOST!,
      port : parseInt(process.env.TEST_DB_PORT!),
      username : process.env.TEST_DB_USER!,
      password : process.env.TEST_DB_PASSWORD!,
      database : process.env.TEST_DB_NAME!
    })
    
    this._database = new Database(this._dataSource)
    this._app      = await App.createInstance().initialize()
  }

  async tearDown() {    
    if (this._dataSource.isInitialized) {
      return await this._dataSource.destroy();
    }
    await App.createInstance().close()
  }

  async query(query: string) {
    const result = await this._database.query(query)

    return result.fetchOne()
  }

  async queryAll(query: string) {
    const result = await this._database.query(query)

    return result.fetchAll()
  }

}
