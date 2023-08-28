import cors                              from 'cors'
import compression                       from 'compression'
import morgan                            from 'morgan'
import { DataSource, DataSourceOptions } from 'typeorm'
import express, { Express }              from 'express'

import { API, Database, Router } from './api'
import { errorHandler          } from './utils/error'

export default class App {

  api!                     : API
  private static _instance : App
  private _initialized     : boolean
  private _database!       : Database

  private constructor() {
    this._initialized = false
  }

  async initialize() {
    try {
      const app: Express = express()

      if (!this._initialized) {
        console.log("Initializing App . . .")

        this._database    = await this.getDatabase()
        this.api          = await this.createApi()
        this._initialized = true

        const router = new Router(this.api).router
      
        app.use(cors())
        app.use(morgan('dev'))
        app.use(compression())
        app.use(express.json())
        app.use(router)
        app.all("*", (req, res, next) => {
          const err: any = new Error(`Can’t fine ${req.originalUrl} on this server!`);
          err.statusCode = 404;
          next(err);
        });
        app.use(errorHandler)
      }

      return app
    } catch(err) {
      console.error("Create App instance failed: ", err)
      throw err
    }
  }

  static createInstance() {
    return App._instance || (App._instance = new App())
  }

  async close() {
    return this._database.close()
  }

  private createApi = async () => {
    return new API(this._database)
  }

  private async getDatabase() {
    const dbName              = process.env.DB_NAME!;
    const dbOptions           = await this.getDBOptions();
    const dbConnectionOptions = await this.createConnectionOptions({ dbName, ...dbOptions });

    try {
      const connection = new DataSource(dbConnectionOptions);
      if (!connection.isInitialized) await connection.initialize();
      return new Database(connection);
    } catch(err) {
      console.error("Error during Data Source initialization", err);
      throw err;
    }
  }

  private async getDBOptions() {
    return {
      dbType   : process.env.DB_TYPE!,
      dbHost   : process.env.DB_HOST!,
      port     : parseInt(process.env.DB_PORT!),
      username : process.env.DB_USER!,
      password : process.env.DB_PASSWORD!,
    }
  }

  private async createConnectionOptions(
    dbOptions : {
      dbName       : string,
      dbType       : string,
      dbHost?      : string,
      port         : number,
      username     : string,
      password?    : string,
    }) {
    const {
      dbName,
      dbType,
      dbHost,
      port,
      username,
      password,
    } = dbOptions
    
    return {
      database : dbName,
      type     : dbType,
      host     : dbHost,
      port     : port,
      username : username,
      password : password,
    } as DataSourceOptions
  }
}
