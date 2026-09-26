module.exports = async function positionController(_request, response) {
      return response.status(501).json({ stage: 'position', error: 'Stage handler is not implemented yet' });
};