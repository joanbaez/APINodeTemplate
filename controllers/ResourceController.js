'use strict';

var ResourceService = require('../services/ResourceService');

class ResourceController {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/resources', this.getResources.bind(this));
        this.router.get('/resources/:id', this.getSingleResource.bind(this));
        this.router.post('/resources', this.postResource.bind(this));
        this.router.put('/resources/:id', this.putResource.bind(this));
    }

    getResources(req, res) {
        var resources = ResourceService.getResources();
        res.send(resources);
    }

    getSingleResource(req, res) {
        var id = req.params.id;
        var resource = ResourceService.getSingleResource(id);

        if (!resource) {
            res.sendStatus(404);
        } else {
            res.send(resource);
        }
    }

    putResource(req, res) {
        var id = parseInt(req.params.id, 10);
        var existingResource = ResourceService.getSingleResource(id);

        if (!existingResource) {
            let resourceInfo = req.body;
            resourceInfo.id = id;
            if (ResourceService.addResource(resourceInfo)) {
                res.setHeader('Location', '/resources/' + id);
                res.sendStatus(201);
            } else {
                res.sendStatus(500);
            }
        } else {
            if (ResourceService.updateResource(id, req.body)) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        }
    }

    postResource(req, res) {
        var resourceInfo = req.body;

        if (ResourceService.addResource(resourceInfo)) {
            res.setHeader('Location', '/resources/' + resourceInfo.id);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    }
}

module.exports = ResourceController;