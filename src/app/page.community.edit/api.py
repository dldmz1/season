import datetime

orm = wiz.model("portal/season/orm")
community = orm.use("community")

def load():
    id = wiz.request.query("id", True)
    row = community.get(id=id)
    wiz.response.status(200, row)

def update():
    id = wiz.request.query("id", True)
    title = wiz.request.query("title", True)
    priority = wiz.request.query("priority", 0)
    content = wiz.request.query("content", True)

    post = dict()
    post['priority'] = priority
    post['user'] = wiz.session.get("id")
    post['title'] = title
    post['content'] = content

    if id == "new":
        post['created'] = datetime.datetime.now()
        community.insert(post)
        wiz.response.status(200, "등록 완료")
    else:
        post['id'] = id
        community.update(post, id=id)
        wiz.response.status(200, "수정 완료")

def remove():
    id = wiz.request.query("id", True)
    community.delete(id=id)
    wiz.response.status(200)