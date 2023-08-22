orm = wiz.model("orm")
community = orm.use("community")

def load():
    id = wiz.request.query("id", True)
    row = community.get(id=id)
    wiz.response.status(200, row)