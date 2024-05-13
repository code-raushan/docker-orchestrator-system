import Docker from "dockerode";
import { BadRequestError } from "../errors/bad-request.error";
import logger from "../utils/logger";
import portMappingService from "./port-mapping.service";

class OrchestrationService {
    private _docker: Docker
    constructor() {
        this._docker = new Docker();
    }

    async create(params: { image: string }) {
        const { image } = params;

        await this._docker.pull(image);
        const availablePort = await portMappingService.availablePort();
        const container = await this._docker.createContainer({
            Image: image,
            AttachStdout: true,
            AttachStderr: true,
            Tty: true,
            HostConfig: {
                PortBindings: {
                    "80/tcp": [{ HostPort: availablePort }]
                }
            }
        });

        try {
            await portMappingService.setPortToContainer({ availablePort, containerId: container.id });
            await portMappingService.setContainerToPort({ availablePort, containerId: container.id });
        } catch (error) {
            logger.error(`failed to bind port and container informations - ${error}`);
            await this._docker.getContainer(container.id).remove();
            throw new BadRequestError("Failed to bind port and container informations");
        }

        await container.start();

        return {
            containerId: container.id
        }
    }
}

export default new OrchestrationService();