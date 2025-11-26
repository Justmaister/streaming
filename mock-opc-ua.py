from opcua import Server, ua
import random
import time

server = Server()
server.set_endpoint("opc.tcp://127.0.0.1:4840")
uri = "http://examples.org"
idx = server.register_namespace(uri)
print("Namespace index:", idx)

obj = server.nodes.objects.add_object(idx, "SensorData")
temp_1 = obj.add_variable(ua.NodeId("Temperature_1", idx), "Temperature_1", 20.0)
temp_1.set_writable()
wind_1 = obj.add_variable(ua.NodeId("Wind_1", idx), "Wind_1", 10.0)
wind_1.set_writable()
punto_n01 = obj.add_variable(ua.NodeId("N-01", idx), "N-01", -30)
punto_n01.set_writable()

temp_2 = obj.add_variable(ua.NodeId("Temperature_2", idx), "Temperature_2", 20.0)
temp_2.set_writable()
wind_2 = obj.add_variable(ua.NodeId("Wind_2", idx), "Wind_2", 10.0)
wind_2.set_writable()
punto_n02 = obj.add_variable(ua.NodeId("N-02", idx), "N-02", -30)
punto_n02.set_writable()

server.start()
print("OPC-UA Server started")

try:
    while True:
        new_temp = random.uniform(15.0, 30.0)
        temp_1.set_value(new_temp)
        print(f"Temperature_1: {new_temp:.2f}")
        new_wind_1 = random.uniform(2.5, 15.0)
        wind_1.set_value(new_wind_1)
        print(f"Wind_1: {new_wind_1:.2f}")
        new_punto_n01 = random.uniform(-10, -80.0)
        punto_n01.set_value(new_punto_n01)
        print(f"Punto N-01: {new_punto_n01:.2f}")
        new_temp_2 = random.uniform(20.0, 35.0)
        temp_2.set_value(new_temp_2)
        print(f"Temperature 2: {new_temp_2:.2f}")
        new_wind_2 = random.uniform(5.0, 22.5)
        wind_2.set_value(new_wind_2)
        print(f"Wind_1: {new_wind_2:.2f}")
        new_punto_n02 = random.uniform(-20, -60.0)
        punto_n02.set_value(new_punto_n02)
        print(f"Punto N-01: {new_punto_n02:.2f}")
        time.sleep(5)
finally:
    server.stop()