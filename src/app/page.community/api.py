import math

orm = wiz.model("portal/season/orm")
community = orm.use("community")
user = orm.use("user")

def load():
    page = int(wiz.request.query("page", 1))
    text = wiz.request.query("text", "")
    dump = 14

    if len(text) == 0:
        where = dict(
            orderby="created",
            order="DESC",
            page=page,
            dump=dump
        )
        rows = community.rows(**where)
        lastpage = math.ceil(community.count(**where) / dump)
    else:
        search = { "title": text }
        where = dict(
            orderby="created,",
            order="DESC",
            page=page,
            dump=dump,
            like = "title",
            **search
        )
        rows = community.rows(**where)
        lastpage = math.ceil(community.count(**where) / dump)

    for i in range(len(rows)):
        rows[i]['user'] = user.get(id=rows[i]['user'])['name']

    login = wiz.session.get('id')
        
    wiz.response.status(200, {
        "lastpage": lastpage,
        "list": rows,
        "login": login,
    })