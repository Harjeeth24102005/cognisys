import urllib.request
import json

def test_full_system():
    # 1. Admin login test
    login_data = json.dumps({'username_or_email': 'harjeeth', 'password': 'harjeeth@2005'}).encode('utf-8')
    req = urllib.request.Request('http://127.0.0.1:8000/api/auth/login', data=login_data, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req) as resp:
        login_res = json.loads(resp.read().decode('utf-8'))
        print('1. ADMIN LOGIN SUCCESS:', login_res['user']['username'], '| Role:', login_res['user']['role'])
        token = login_res['access_token']

    # 2. Guest Order & Direct Email Spec Dispatch
    order_payload = {
        'customer_name': 'Sarah Connor',
        'customer_email': 'sarah@skydefense.ai',
        'customer_phone': '+1 987 654 3210',
        'project_title': 'Autonomous CV Perimeter Defence',
        'service_type': 'ai_cctv',
        'notes': 'High priority deployment - 32 edge camera streams with automated vehicle license plate recognition',
        'cart_items': [
            {
                'id': 'cctv-enterprise',
                'title': 'Cognisys Enterprise AI Surveillance System',
                'price': 8500,
                'specs': {'Cameras': '32 Nodes', 'Detection': 'LPR + Facial + Intrusion', 'Storage': '180 Days'}
            }
        ]
    }
    order_data = json.dumps(order_payload).encode('utf-8')
    req = urllib.request.Request('http://127.0.0.1:8000/api/orders', data=order_data, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req) as resp:
        order_res = json.loads(resp.read().decode('utf-8'))
        print('2. GUEST PURCHASE DISPATCHED TO contact.cognisys@gmail.com:')
        print('   Order Number:', order_res['order_number'])
        print('   Status:', order_res['status'])
        print('   Email Dispatched:', order_res['email_dispatched'])
        print('   Message:', order_res['message'])

    # 3. Admin Viewing Orders
    req = urllib.request.Request('http://127.0.0.1:8000/api/orders', headers={'Authorization': f'Bearer {token}'})
    with urllib.request.urlopen(req) as resp:
        orders = json.loads(resp.read().decode('utf-8'))
        print('3. ADMIN ORDERS ACCESSIBLE IN HARJEETH DASHBOARD:')
        for o in orders[-3:]:
            cname = o.get('customer_name') or 'User'
            print(f"   - [{o['order_number']}] {o['title']} by {cname} (Status: {o['status']})")

if __name__ == '__main__':
    test_full_system()
