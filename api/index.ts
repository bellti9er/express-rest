import Database from '../database'
import Router   from './controllers'

import { 
  PingService
} from './services'
import { 
  PingDao,
} from './models'

class API {
  pingService : PingService

  constructor(private database: Database) {
    const pingDao = new PingDao(database);

    this.pingService = new PingService(pingDao);
  }
}

export { API, Database, Router }
