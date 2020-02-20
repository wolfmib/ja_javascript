/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./gameslot_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.GameSlotServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.GameSlotServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Slot_Object_Ping,
 *   !proto.Slot_Object_Pong>}
 */
const methodDescriptor_GameSlotService_obtenir_slot_object = new grpc.web.MethodDescriptor(
  '/GameSlotService/obtenir_slot_object',
  grpc.web.MethodType.UNARY,
  proto.Slot_Object_Ping,
  proto.Slot_Object_Pong,
  /**
   * @param {!proto.Slot_Object_Ping} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Slot_Object_Pong.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Slot_Object_Ping,
 *   !proto.Slot_Object_Pong>}
 */
const methodInfo_GameSlotService_obtenir_slot_object = new grpc.web.AbstractClientBase.MethodInfo(
  proto.Slot_Object_Pong,
  /**
   * @param {!proto.Slot_Object_Ping} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Slot_Object_Pong.deserializeBinary
);


/**
 * @param {!proto.Slot_Object_Ping} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Slot_Object_Pong)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Slot_Object_Pong>|undefined}
 *     The XHR Node Readable Stream
 */
proto.GameSlotServiceClient.prototype.obtenir_slot_object =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/GameSlotService/obtenir_slot_object',
      request,
      metadata || {},
      methodDescriptor_GameSlotService_obtenir_slot_object,
      callback);
};


/**
 * @param {!proto.Slot_Object_Ping} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Slot_Object_Pong>}
 *     A native promise that resolves to the response
 */
proto.GameSlotServicePromiseClient.prototype.obtenir_slot_object =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/GameSlotService/obtenir_slot_object',
      request,
      metadata || {},
      methodDescriptor_GameSlotService_obtenir_slot_object);
};


module.exports = proto;

