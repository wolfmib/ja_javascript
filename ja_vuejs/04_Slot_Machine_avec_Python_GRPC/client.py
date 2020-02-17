import os
import gameslot_pb2_grpc
import gameslot_pb2
import time
import grpc 

def run():
    __run_id = 0 
    pid    = os.getpid()
    with grpc.insecure_channel("localhost:9999") as channel:

        # Key: __grpc.__ServiceStub(channel)
        stub = gameslot_pb2_grpc.GameSlotServiceStub(channel)
        while True:
            try:
                start = time.time()
                # api method , definition in proto
                response = stub.obtenir_slot_object(gameslot_pb2.Slot_Object_Ping(run_id=__run_id))

