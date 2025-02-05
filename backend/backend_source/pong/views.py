from django.shortcuts import render
from .models import TestModel
import json
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.core.exceptions import BadRequest

# Create your views here.
def pong(request):
    return render(request, "pong.html")

def test_model(request):
    elements = TestModel.objects.all()
    return render(request, "test_model.html", {"Elements": elements})


@csrf_exempt
def pong_login(request):
    try:
        if request.method != "POST":
            return JsonResponse({"ok": False, "error": "Method not allowed", "statusCode": 405}, status=405)
        
        if not request.body:
            raise BadRequest("Request without body")
        
        data = json.loads(request.body)
        user = authenticate(request, username=data.get("username"), password=data.get("password"))

        if user is not None:
            return JsonResponse({"ok": True, "message": "Logged in", "statusCode": 200}, status=200)
        else:
            return JsonResponse({"ok": False, "error": "Invalid credentials", "statusCode": 401}, status=401)

    except Exception as err:
        return JsonResponse({"ok": False, "error": str(err), "statusCode": 400}, status=400)
    

@csrf_exempt
def pong_register(request):
    try:
        if request.method != "POST":
            return JsonResponse({"ok": False, "error": "Method not allowed", "statusCode": 405}, status=405)
        
        if not request.body:
            raise BadRequest("Request without body")
        
        data = json.loads(request.body)
        username=data.get("username")
        password=data.get("password")

        if not username or not password:
            return JsonResponse({"ok": False, "error": "Both username and password required", "statusCode": 400}, status=400)

        User.objects.create_user(username=username, password=password)

        return JsonResponse({"ok": True, "message": "Successfully registered", "statusCode": 200}, status=200)

    except IntegrityError:
        return JsonResponse({"ok": False, "error": "This username is already used", "statusCode": 400}, status=400)
    except Exception as err:
        return JsonResponse({"ok": False, "error": str(err), "statusCode": 400}, status=400)