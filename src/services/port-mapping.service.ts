import { BadRequestError } from "../errors/bad-request.error";
import logger from "../utils/logger";
import redisClient from "./redis.service";

class PortMappingService {
    private _redisClient;
    constructor() {
        this._redisClient = redisClient;
    }

    async availablePort() {
        for (let i = 8000; i < 9000; i++) {
            if ((await this._redisClient.hGet("portToContainer", String(i)))) continue;
            return String(i);
        }
        throw new BadRequestError("No available port");
    }

    async setPortToContainer(params: { containerId: string, availablePort: string }) {
        const { containerId, availablePort } = params;

        await this._redisClient.hSet("portToContainer", availablePort, containerId).catch(async (err) => {
            logger.error(`failed to assign container id to the available port - ${err}`)
            throw new BadRequestError("failed to assign container id to the available port");
        });
    }

    async setContainerToPort(params: { containerId: string, availablePort: string }) {
        const { containerId, availablePort } = params;

        await this._redisClient.hSet("containerToPort", containerId, availablePort).catch(async (err) => {
            logger.error(`failed to assign available port to the container id - ${err}`)
            throw new BadRequestError("failed to assign available port to the container id");
        });
    }

}

export default new PortMappingService();