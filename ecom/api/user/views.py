from django.shortcuts import render
import random
# Create your views here.

def generate_session_token(length=10):
    # chr(97) give 'a', chr(122) gives 'z'
    # chr(i) for i in range(97,123) - gives all the letters from a to Z.
    # str(5) give string '5'
    # str(i) for i in range(10) - gives all the numbers from 0 to 9
    # for _ in range(length) - the _ - simply says we dont care to give the data a key
    # The whole thing basically creates a 10 character long string made of letters and numbers
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97,123)] + [str(i) for i in range(10)]) for _ in range(length))