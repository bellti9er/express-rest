import express from 'express'

import { API        } from '../'
import PingController from './ping-controller'

export default class Router {
  router: express.Router;

  constructor(private api: API) {
    this.router = express.Router();
    this.initializeControllers();
  }

  private initializeControllers() {
    const pingController = new PingController(this.api.pingService)

    pingController.createEndPoint(this.router)
  }
}
