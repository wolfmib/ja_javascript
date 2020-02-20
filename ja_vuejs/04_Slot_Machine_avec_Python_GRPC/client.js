const { Slot_object_Ping, Slot_Object_Pong } = require('./compiled_js_proto/proto/gameslot_pb.js')
const { GameSlotService } = require('./compiled_js_proto/proto/gameslot_grpc_web_pb.js')


var my_slot_service = new GameSlotService('http://localhost:8080');
var request         = new Slot_object_Ping();
//var response        = new Slot_Object_Pong();


request.setMessage(543);

my_slot_service.obtenir_slot_object(request,{},function(err,response){
    console.log("I get you.... the response is following")
    console.log(response)
});


