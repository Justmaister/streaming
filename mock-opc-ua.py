# pip install opcua influxdb-client

from opcua import Server, ua
import random
import time

server = Server()
# server.set_endpoint("opc.tcp://0.0.0.0:4840/")  # Listen on all interfaces use 127.0.0.1 for local
server.set_endpoint("opc.tcp://127.0.0.1:4840")  # Listen on all interfaces use 127.0.0.1 for local
uri = "http://examples.org"     # Unique URI for the server (needs to be unique, not a real website)
idx = server.register_namespace(uri)
print("Namespace index:", idx)

obj = server.nodes.objects.add_object(idx, "SensorData")
# temp = obj.add_variable(idx, "Temperature", 20.0)   # Sets the starting value for the temperature variable
temp = obj.add_variable(ua.NodeId("Temperature", idx), "Temperature", 20.0) #change i=2 to s=Temperature
temp.set_writable()
temp_2 = obj.add_variable(ua.NodeId("Temperature_2", idx), "Temperature_2", 20.0) #change i=2 to s=Temperature
temp_2.set_writable()
punto_n01 = obj.add_variable(ua.NodeId("N-01", idx), "N-01", -30)
punto_n01.set_writable()

server.start()
print("OPC-UA Server started")

try:
    while True:
        new_temp = random.uniform(15.0, 30.0)
        temp.set_value(new_temp)
        print(f"Temperature: {new_temp:.2f}")
        new_temp_2 = random.uniform(15.0, 30.0)
        temp_2.set_value(new_temp_2)
        print(f"Temperature 2: {new_temp_2:.2f}")
        new_punto_n01 = random.uniform(-10, -80.0)
        punto_n01.set_value(new_punto_n01)
        print(f"Punto N-01: {new_punto_n01:.2f}")
        time.sleep(5)
finally:
    server.stop()