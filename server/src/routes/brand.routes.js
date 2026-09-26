const express = require('express');
const BrandSession = require('../models/BrandSession');

const router = express.Router();

router.get('/:id', async (request, response, next) => {
      try {
            const brand = await BrandSession.findById(request.params.id);
            if (!brand) return response.status(404).json({ error: 'Brand session not found' });
            return response.json(brand);
      } catch (error) {
            return next(error);
      }
});

router.put('/:id', async (request, response, next) => {
      try {
            const brand = await BrandSession.findByIdAndUpdate(request.params.id, request.body, {
                  new: true,
                  runValidators: true,
            });
            if (!brand) return response.status(404).json({ error: 'Brand session not found' });
            return response.json(brand);
      } catch (error) {
            return next(error);
      }
});

module.exports = router;