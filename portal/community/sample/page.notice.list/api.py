orm = wiz.model("orm")
community = orm.use("community")

def load():
    text = wiz.request.query("text", "")
    category = "notice"

    if len(text) == 0:
        rows = community.rows(orderby="created", order="DESC", category=category)
    else:
        where = { "title": text }
        like = "title"
        rows = community.rows(orderby="created", order="DESC", category=category, like=like, **where)
        
    wiz.response.status(200, rows)