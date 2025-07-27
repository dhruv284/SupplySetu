from flask import Blueprint, request, jsonify
from app.models import db, User, Order, Product, VendorGroup  # assuming model is called User
from werkzeug.security import generate_password_hash

auth_bp = Blueprint('auth', __name__, url_prefix='/api')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Basic validation
    required_fields = ['user_type', 'fullName', 'businessName', 'mobileNumber', 'emailAddress', 'language', 'password', 'confirmPassword']
    if not all(field in data and data[field] for field in required_fields):
        return jsonify({'message': 'All fields are required.'}), 400

    if data['password'] != data['confirmPassword']:
        return jsonify({'message': 'Passwords do not match.'}), 400

    # Create new user
    new_user = User(
        user_type=data['user_type'],
        full_name=data['fullName'],
        business_name=data['businessName'],
        mobile_number=data['mobileNumber'],
        email=data['emailAddress'],
        language=data['language'],
        password_hash=generate_password_hash(data['password'])
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully.'}), 201

from flask import request, jsonify
from werkzeug.security import check_password_hash
from app.models import db, User

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    if not email or not password or not role:
        return jsonify({"message": "All fields are required"}), 400

    user = User.query.filter_by(email=email, user_type=role).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid email or password"}), 401

    return jsonify({
    "message": "Login successful",
    "user_id": user.id,   # 👈 Return this!
    "role": user.user_type
    }), 200

@auth_bp.route("/supplier/orders", methods=["GET"])
def get_supplier_orders():
    vendor_id = request.args.get("supplier_id")  # Frontend still passes supplier_id

    if not vendor_id:
        return jsonify({"error": "Supplier ID is required"}), 400

    orders = Order.query.filter_by(vendor_id=vendor_id).all()

    order_list = []
    for o in orders:
        order_list.append({
            "id": o.id,
            "item": o.product.name,  # Assuming 'product' has a 'name'
            "quantity": o.quantity,
            "buyer": o.vendor.business_name,  # Or buyer if different
            "status": o.status
        })

    return jsonify({"orders": order_list})

@auth_bp.route('/add-products', methods=['POST'])
def add_product():
    data = request.json
    print("Received data:", data)
    try:
        new_product = Product(
            name=data['name'],
            description=data['description'],
            price=float(data['price']),
            unit=data['unit'],
            category=data['category'],
            supplier_id=int(data['supplier_id'])  # ✅ Correct field here
        )

        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'Product added successfully'}), 201
    except Exception as e:
        db.session.rollback()
        print("Error while adding product:", e)
        return jsonify({'error': str(e)}), 400

@auth_bp.route('/add-vendor-group', methods=['POST'])
def add_vendor_group():
    data = request.json
    try:
        name = data['name']
        description = data.get('description', '')
        supplier_ids = data.get('supplier_ids', [])  # list of supplier IDs

        # Validate users
        suppliers = User.query.filter(User.id.in_(supplier_ids)).all()

        new_group = VendorGroup(name=name, description=description, suppliers=suppliers)
        db.session.add(new_group)
        db.session.commit()
        return jsonify({'message': 'Vendor group created successfully'}), 201
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
@auth_bp.route('/suppliers', methods=['GET'])
def get_suppliers():
    try:
        suppliers = User.query.filter_by(user_type='supplier').all()
        print(suppliers)
        result = [{
            'id': s.id,
            'name': s.full_name,
            'email': s.email
        } for s in suppliers]
        return jsonify({'suppliers': result}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
