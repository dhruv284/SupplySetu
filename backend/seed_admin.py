from app import create_app
from app.models import db, bcrypt, User
from werkzeug.security import generate_password_hash
app = create_app()

with app.app_context():
    admin_email = "admin@supplysetu.in"
    existing_admin = User.query.filter_by(email=admin_email).first()

    if not existing_admin:
        admin = User(
            user_type="admin",
            full_name="Super Admin",
            business_name="SupplySetu HQ",
            mobile_number="9999999999",
            email=admin_email,
            language="English",
            password_hash=generate_password_hash("admin123"),
        )
        db.session.add(admin)
        db.session.commit()
        print("✅ Admin user created successfully.")
    else:
        print("ℹ️ Admin already exists.")
