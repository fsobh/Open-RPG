module.exports = {
  Build: function (status, message) {
    return {
      statusCode: status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        
      },
      body: JSON.stringify(message, null, 2),
    };
  },
};
