import datetime
import re

orm = wiz.model("portal/season/orm")
userdb = orm.use("user")

def join():
    user = wiz.request.query()

    if not re.match(r"[^@]+@[^@]+\.[^@]+", user['mail']):
        return wiz.response.status(401, '잘못된 이메일 형식입니다.')

    user['created'] = datetime.datetime.now()
    userdb.insert(user)
    wiz.session.clear()
    return wiz.response.status(200, True)