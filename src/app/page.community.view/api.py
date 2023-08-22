orm = wiz.model("portal/season/orm")
community = orm.use("community")
user = orm.use("user")

def load():
    id = wiz.request.query("id", True)

    row = community.get(id=id)
    row['user'] = user.get(id=row['user'], fields="id,name")
    login = wiz.session.get("id")

    wiz.response.status(200, {
        "view": row,
        "login": login,
    })