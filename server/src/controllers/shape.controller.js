module.exports = async function shapeController(_request, response) {
      return response.status(501).json({ stage: 'shape', error: 'Stage handler is not implemented yet' });
};