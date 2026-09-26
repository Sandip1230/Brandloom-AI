const express = require('express');
const controllers = {
      understand: require('../controllers/understand.controller'),
      position: require('../controllers/position.controller'),
      shape: require('../controllers/shape.controller'),
      visualize: require('../controllers/visualize.controller'),
      challenge: require('../controllers/challenge.controller'),
      deliver: require('../controllers/deliver.controller'),
};

const router = express.Router();

router.post('/:stageName', (request, response, next) => {
      const controller = controllers[request.params.stageName];
      if (!controller) return response.status(404).json({ error: 'Unknown pipeline stage' });
      return controller(request, response, next);
});

module.exports = router;