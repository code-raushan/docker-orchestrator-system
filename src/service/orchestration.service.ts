import Docker from "dockerode";

class OrchestrationService {
    private _docker: Docker
    constructor() {
        this._docker = new Docker();
    }

    async create() {
        const container = await this._docker.createContainer({
            Image: ''
        });
    }
}