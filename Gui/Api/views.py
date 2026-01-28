from django.http import JsonResponse
import json
import requests
from django.views.decorators.csrf import csrf_exempt

shelf = 1
resource = 1

@csrf_exempt
def getAdbdevices(request):
    try:
        body = json.loads(request.body).get('body')

        test_ip = body.get('ip')
        adb_id = body.get('adbId') or ""
        port = 8080
        
        res = requests.post(
            f"http://{test_ip}:{port}/cli-json/adb/",
            json={
                "shelf": 1,
                "resource": 1,
                "adb_id": adb_id,
                "key": 8,
                "adb_cmd": "devices -l",
            },
            # timeout=10,
        )

        return JsonResponse(res.json(), status=res.status_code)

    except Exception as e:
        print("ERROR:", e)
        return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
def togglewifi(request):
    try:
        body = json.loads(request.body).get('body')
        # print("BODY:", body)

        test_ip = body.get("ip")
        action = body.get("type")     
        adb_id = body.get("adb_id")

        if not test_ip or not adb_id or action not in ["enable", "disable"]:
            return JsonResponse(
                {"error": "ip, adb_id and valid type (enable/disable) are required"},
                status=400
            )

        res = requests.post(
            f"http://{test_ip}:8080/cli-json/adb/",
            json={
                "shelf": shelf,
                "resource": resource,
                "adb_id": adb_id,
                "key": 8,
                "adb_cmd": f"shell svc wifi {action}",
            },
            timeout=10,
        )

        return JsonResponse(res.json(), status=res.status_code)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({"error": str(e)}, status=400)
    
    

@csrf_exempt
def connectwifi(request):
    body = json.loads(request.body).get('body')
    # return JsonResponse({"msg":body},status=200)
    print(body)
    try:
        test_ip = body['ip']
        print(test_ip)
        adb_id = body['adb_id']
        print(adb_id)
        resource = 1
        ssid = body['ssid']
        print(ssid)
        password = body.get('password', "")
        print(password)
        encryption = body.get('encryption', "open")
        print(encryption)
        
        print(f"this is {test_ip} {adb_id} {resource} {ssid} {password} {encryption}")

        adb_cmd = (
            f"shell am start -n com.candela.wecan/"
            f"com.candela.wecan.StartupActivity "
            f"--es auto_start 1 "
            f"--es ssid \"{ssid}\" "
            f"--es password \"{password}\" "
            f"--es encryption {encryption} "
            f"--es auto_wifi 1"
        )

        res = requests.post(
            f"http://{test_ip}:8080/cli-json/adb/",
            json={
                "shelf": 1,
                "resource": resource,
                "adb_id": adb_id,
                "key": 8,
                "adb_cmd": adb_cmd
            }
        )

        return JsonResponse(res.json(), status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
def restartapp(request):
    body = json.loads(request.body).get('body')
    # return JsonResponse({"msg":body},status=200)
    try:
        body = json.loads(request.body).get("body")
        print(body)
        test_ip = body.get("ip")
        adb_id = body.get("adb_id")
        shelf = 1
        resource = 1

        if not all([test_ip, adb_id]):
            return JsonResponse({
                "error": "Missing required fields: ip, adb_id"
            }, status=400)

        res = requests.post(
            f"http://{test_ip}:8080/cli-json/adb/",
            json={
                "shelf": shelf,
                "resource": resource,
                "adb_id": adb_id,
                "key": 8,
                "adb_cmd": "shell am force-stop com.candela.wecan"
            },
            timeout=10
        )
        return JsonResponse(res.json(), status=res.status_code)
    except Exception as e:
        return JsonResponse({
            "error": str(e)
        }, status=400)

@csrf_exempt
def scannetworks(request):
    body = json.loads(request.body).get('body')
    # return JsonResponse({"msg":body},status=200)
    print(body)
    try:
        test_ip = body.get("ip")
        adb_id = body.get("adb_id")
        # print(test_ip,adb_id)
        shelf = 1
        resource = 1

        if not all([test_ip, adb_id]):
            return JsonResponse({
                "error": "Missing required fields: ip, adb_id"
            }, status=400)
        # print("before res and after not all")

        res = requests.post(
            f"http://{test_ip}:8080/cli-json/adb/",
            json={
                "shelf": shelf,
                "resource": resource,
                "adb_id": adb_id,
                "key": 8,
                "adb_cmd": "shell cmd wifi list-scan-results"
            },
            timeout=10
        )
        # print(res)
        raw = res.json()
        # print(raw)
        output = raw.get("LAST", {}).get("callback_message", "")

        parsed = ""
        try:
            parsed = parse_wifi_scan(output)
        except Exception as e:
            print(e)
            
        return JsonResponse(
            {"networks": parsed},
            status=200
        )
    except Exception as e:
        return JsonResponse({
            "error": str(e)
        }, status=400)

        
def parse_wifi_scan(output: str):
    lines = output.strip().split("\n")

    lines = lines[1:]

    results = []

    for line in lines:
        parts = line.split()

        if len(parts) < 6:
            continue

        bssid = parts[0]
        frequency = int(parts[1])
        rssi = int(parts[2])
        age = float(parts[3])

        flags_start = next(i for i, p in enumerate(parts) if p.startswith("["))
        ssid = " ".join(parts[4:flags_start])
        flags = " ".join(parts[flags_start:])

        results.append({
            "bssid": bssid,
            "frequency": frequency,
            "rssi": rssi,
            "age": age,
            "ssid": ssid,
            "flags": flags
        })

    return results


    