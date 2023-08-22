import datetime
import re

orm = wiz.model("portal/season/orm")
tableDB = orm.use("table")

def load():
    rows = tableDB.rows()
    wiz.response.status(200, rows)

def create():
    data = wiz.request.query()

    if not re.match(r"[^@]+@[^@]+\.[^@]+", data['email']):
        wiz.response.status(401)
    data['created'] = datetime.datetime.now()

    tableDB.insert(data)
    wiz.response.status(200)