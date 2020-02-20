from concurrent import futures
import grpc
import gameslot_pb2
import gameslot_pb2_grpc
import time
import threading


# Key: __grpc -> __Servicer
class Listener(gameslot_pb2_grpc.GameSlotServiceServicer):
    def __init__(self,*args,**kwargs):
        self.counter = 0
        self.lastPrintTime = time.time()

    # the function from proto file's api_method_name
        # rpc obtenir_slot_object (Slot_Object_Ping) returns (Slot_Object_Pong){}
    def obtenir_slot_object(self, request,context):
        self.counter += 1

        if self.counter % 1000 == 0:
            print("Got you, the counter = ",self.counter)

        return gameslot_pb2.Slot_Object_Pong(run_id=request.run_id + 1)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=1))
    # Key: __grpc -> Add___Servicer_to_server
    gameslot_pb2_grpc.add_GameSlotServiceServicer_to_server(Listener(),server)


    # Setting port
    server.add_insecure_port("[::]:9999")
    server.start()
    try:
        while True:
            print("Server on: threads %i"%(threading.active_count()))
            time.sleep(10)
    except KeyboardInterrupt:
        print("KeyboardInterrupt")
        server.stop(0)


if __name__ == "__main__":
    serve()
