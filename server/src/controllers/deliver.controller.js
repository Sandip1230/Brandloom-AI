module.exports = async function deliverController(_request, response) {
      return response.status(501).json({ stage: 'deliver', error: 'Stage handler is not implemented yet' });
};