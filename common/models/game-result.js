'use strict';

module.exports = function(GameResult) {
  GameResult.disableRemoteMethodByName('create');
  GameResult.disableRemoteMethodByName('upsert');
  GameResult.disableRemoteMethodByName('updateAll');
  GameResult.disableRemoteMethodByName('createChangeStream');
  GameResult.disableRemoteMethodByName('exists');

  GameResult.upload = function (ctx,options,callback) {
    if(!options) options = {};
    console.log(ctx);
    console.log("\n");
    console.log(options);
    ctx.req.params.container = 'replay';
    GameResult.app.models.UserUpload.upload(ctx.req,
                                     ctx.result,
                                     options,
                                     function (err, fileObj) {
      if(err) {
        callback(err);
      } else {
        var fileInfo = fileObj.files.file[0];
        GameResult.create({
            name: fileObj.fields.bot_name,
            authorId: fileObj.fields.user_id,
            race: "terran",
            dll: '/api/user-uploads/download/'+fileInfo.name
        }, function (err,obj) {
          if (err !== null) {
            callback(err);
          } else {
            callback(null, obj);
          }
        });
      }
    });
  };

  GameResult.remoteMethod(
    'upload',
    {
      description: 'Uploads a file',
      accepts: [
        { arg: 'ctx', type: 'object', http: { source:'context' } },
        { arg: 'options', type: 'object', http:{ source: 'query'} }
      ],
      returns: {
        arg: 'fileObject', type: 'object', root: true
      },
      http: {verb: 'post'}
    }
  );
};
