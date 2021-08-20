const httpStatus = require("http-status");
const APIResponse = require("../helpers/APIResponse");
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

class agoraController {
  //   Agora signUp
  async create(req, res, next) {
    try {
      if (!req.body) {
        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse(
              {},
              "Please enter valid data",
              httpStatus.BAD_REQUEST
            )
          );
      } else {
        let body = req.body;
        let appID = process.env.APP_ID;
        let appCertificate = process.env.APP_CERTIFICATE;
        let expirationTimeInSeconds = 84600;
        let role = RtcRole.PUBLISHER;
        let currentTimestamp = Math.floor(Date.now() / 1000);
        let privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
        let channelName = body.channelName;
        let uid = req.query.uid || 0;
        if (!channelName) {
          return res
            .status(httpStatus.BAD_REQUEST)
            .json(
              new APIResponse(
                {},
                "channel name is required",
                httpStatus.BAD_REQUEST
              )
            );
        }

        var token = RtcTokenBuilder.buildTokenWithUid(
          appID,
          appCertificate,
          channelName,
          uid,
          role,
          privilegeExpiredTs
        );

        if (token) {
          return res
            .status(httpStatus.OK)
            .json(
              new APIResponse(token, "Agora sent successfully", httpStatus.OK)
            );
        }
      }
    } catch (error) {}
  }
}

var exports = (module.exports = new agoraController());
