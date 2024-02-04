from app import create_app
from config import DevelopmentConfig, ProductionConfig

#app = create_app(DevelopmentConfig)
#app.run(host='0.0.0.0')

app = create_app(ProductionConfig)
