import os
from app import create_app
from app.models import db
from dotenv import load_dotenv

load_dotenv()

app = create_app()

# Ensure this runs only when using `python run.py`, not with Gunicorn
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
