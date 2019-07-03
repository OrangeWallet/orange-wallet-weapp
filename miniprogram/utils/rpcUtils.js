const getTipBlockNumber = () => {
  wx.cloud
    .callFunction({
      name: "rpc",
      data: {
        method: "getTipBlockNumber"
      }
    })
    .then(res => {
      console.log(res.result);
    })
    .catch(console.log);
};

module.exports = {
  getTipBlockNumber
};
