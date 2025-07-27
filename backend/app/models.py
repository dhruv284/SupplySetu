from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_type = db.Column(db.String(20), nullable=False)  # vendor/supplier
    full_name = db.Column(db.String(100), nullable=False)
    business_name = db.Column(db.String(100), nullable=False)
    mobile_number = db.Column(db.String(15), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    language = db.Column(db.String(30), nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    supplier_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(256))
    unit = db.Column(db.String(20), nullable=False)  # kg, litre, etc.
    price = db.Column(db.Float, nullable=False)
    available = db.Column(db.Boolean, default=True)
    category = db.Column(db.String(100))
    supplier = db.relationship("User", backref="products", foreign_keys=[supplier_id])

    def __repr__(self):
        return f"<Product {self.name} (Supplier {self.supplier_id})>"

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    vendor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), nullable=False, default="Pending")
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    product = db.relationship("Product", backref="orders")
    vendor = db.relationship("User", backref="orders_placed", foreign_keys=[vendor_id])

    def __repr__(self):
        return f"<Order {self.id} by Vendor {self.vendor_id}>"

class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    supplier_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    vendor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # 1 to 5
    review = db.Column(db.String(256), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    supplier = db.relationship("User", foreign_keys=[supplier_id], backref="received_ratings")
    vendor = db.relationship("User", foreign_keys=[vendor_id], backref="given_ratings")

    def __repr__(self):
        return f"<Rating {self.rating} by Vendor {self.vendor_id} to Supplier {self.supplier_id}>"

class VendorGroup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.String(256))
    suppliers = db.relationship('User', secondary='vendor_group_suppliers', backref='vendor_groups')

# Association Table
vendor_group_suppliers = db.Table('vendor_group_suppliers',
    db.Column('vendor_group_id', db.Integer, db.ForeignKey('vendor_group.id'), primary_key=True),
    db.Column('supplier_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)
