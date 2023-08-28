import { PingDao } from '../models'

export default class PingService {
  constructor(private pingDao: PingDao) { }

  async ping() {
    return this.pingDao.ping()
  }
}
