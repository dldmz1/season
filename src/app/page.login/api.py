db = wiz.model("portal/season/orm").use("user")

def login():
    id = wiz.request.query("username", True)
    password = wiz.request.query("password", True)
    user = db.get(id=id)
    if user is None:
        wiz.response.status(401, "아이디 또는 비밀번호를 확인해주세요")
    if user['password'](password) == False:
        wiz.response.status(401, "아이디 또는 비밀번호를 확인해주세요")
    del user['password']
    wiz.session.set(**user)
    wiz.response.status(200, True)