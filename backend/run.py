from app import create_app
from config import DevelopmentConfig, ProductionConfig
from waitress import serve
import os

#app = create_app(DevelopmentConfig)
#app.run(host='0.0.0.0')

app = create_app(ProductionConfig)

if __name__ == "__main__":
    serve(app, host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
