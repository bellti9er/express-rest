import { Request, Response, Router } from 'express';

import { wrapAsync   } from '../../utils/error';
import { PingService } from '../services'

export default class PingController {
  constructor(private pingService: PingService) { }

  async createEndPoint(router: Router) {
    const subRouter = await this.configurePingEndpoint();

    router.use('/ping', subRouter);
  }

  private async configurePingEndpoint() {
    const router = Router();

    router.get('', wrapAsync(this.ping.bind(this)))

    return router
  }

  async ping(req: Request, res: Response) {
    const result = await this.pingService.ping()

    return res.status(200).json({ message: result});
  }
}
