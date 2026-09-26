module.exports = async function challengeController(_request, response) {
      return response.status(501).json({ stage: 'challenge', error: 'Stage handler is not implemented yet' });
};