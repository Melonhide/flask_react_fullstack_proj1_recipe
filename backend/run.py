from app import create_app
from config import DevelopmentConfig, ProductionConfig

if __name__ == "__main__":
    #app = create_app(DevelopmentConfig)
    #app.run(host='0.0.0.0')

    app = create_app(ProductionConfig)
