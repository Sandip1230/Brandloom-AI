module.exports = async function visualizeController(_request, response) {
      return response.status(501).json({ stage: 'visualize', error: 'Stage handler is not implemented yet' });
};