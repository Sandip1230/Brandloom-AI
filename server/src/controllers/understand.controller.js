module.exports = async function understandController(_request, response) {
      return response.status(501).json({ stage: 'understand', error: 'Stage handler is not implemented yet' });
};