import random
import pytz
from datetime import datetime, timedelta

def number_random(a, b):
    number = random.randint(a, b)
    return number

def date_time():
    date_actual = datetime.now(pytz.utc)
    date_future = date_actual + timedelta(days=365 * 5)
    fuso_horario = pytz.timezone('America/Sao_Paulo')
    date_future_timezone = date_future.astimezone(fuso_horario)
    
    return date_future_timezone

