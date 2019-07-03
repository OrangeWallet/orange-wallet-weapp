const cloud = require("wx-server-sdk");

cloud.init();

exports.main = async (event, context) => {
  const CKBRPC = require("@nervosnetwork/ckb-sdk-rpc").default;
  const rpc = new CKBRPC("http://202.182.109.101:8114");
  var promise;
  switch (event.method) {
    case "getTipBlockNumber":
      promise = rpc.getTipBlockNumber();
      break;
  }
  return new Promise((resolve, reject) => {
    if (promise != undefined) {
      promise
        .then(res => {
          resolve(res);
          console.log(res);
        })
        .catch(error => {
          reject(error);
          console.log(error);
        });
    } else {
      reject("Wrong rpc");
    }
  });
};
