from apiserve import ApiServer, ApiRoute
from hive2 import model_wrapper

class MyServer(ApiServer):
        @ApiRoute("/request")
        def addbar(req):
            result = model_wrapper(req['category'][0], req['text'][0])
            return result.replace('\n', ' ')
MyServer("127.0.0.1",8080).serve_forever()
