import os
import gameslot_pb2_grpc
import gameslot_pb2
import time
import grpc

def run():
    response_run_id = 0
    pid    = os.getpid()
    with grpc.insecure_channel("localhost:9999") as channel:

        # Key: __grpc.__ServiceStub(channel)
        stub = gameslot_pb2_grpc.GameSlotServiceStub(channel)
        while True:
            try:
                start = time.time()
                # api method , definition in proto
                response = stub.obtenir_slot_object(gameslot_pb2.Slot_Object_Ping(run_id=response_run_id))
                response_run_id = response.run_id
                if response_run_id % 1000 == 0:
                    print("Time = ",time.time(),"Pid = ",pid, "response_run_id = ",response.run_id)
            except KeyboardInterrupt:
                print("KeyboardInterrupt")
                # close channel
                channel.unsubsrcibe(close)
                exit()

def close(channel):
    channel.close()

if __name__ == "__main__":
    run()


