import datetime

orm = wiz.model("orm")
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
    post['category'] = "board"
    post['priority'] = priority
    post['user'] = "test"
    post['title'] = title
    post['content'] = content

    if id == "new":
        post['created'] = datetime.datetime.now()
        community.insert(post)
    else:
        post['id'] = id
        post['updated'] = datetime.datetime.now()
        community.update(post, id=id)
    
    wiz.response.status(200)

def remove():
    id = wiz.request.query("id", True)
    community.delete(id=id)
    wiz.response.status(200)