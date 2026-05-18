from machine import Pin
from utime import sleep
from dht import DHT22

sensor_temp = DHT22(Pin(15))

while True:
    #diz ao sensor que ele solicitará uma leitura
    sensor_temp.measure()
    
    #Leitura umidade
    umidade = sensor_temp.humidity()
    
    #Leitura temperatura
    temperatura = sensor_temp.temperature()
    
    print("A umidade é", umidade)
    print("A temperatura é", temperatura)
    
    
    
    
    
    sleep(2)