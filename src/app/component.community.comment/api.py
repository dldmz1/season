import datetime

orm = wiz.model("portal/season/orm")
community = orm.use("community")
commentDB = orm.use("comment")
user = orm.use("user")

def load():
    post = wiz.request.query("post", True)
    comment = commentDB.rows(post=post, status=["show", "edit"], orderby="created", order="DESC")
    
    for i in range(len(comment)):
        comment[i]['user'] = user.get(id=comment[i]['user'], fields="id,name,mail")
    login = wiz.session.get('id')
    
    data = dict()
    data['comment'] = commentDB.count(post=post, status=["show", "edit"])
    community.update(data, id=post)

    wiz.response.status(200, {
        "list": comment,
        "login": login,
    })

def upload():
    id = wiz.request.query("id", True)
    content = wiz.request.query("content", True)

    data = dict()
    data['post'] = id
    data['user'] = wiz.session.get('id')
    data['content'] = content
    data['created'] = datetime.datetime.now()
    commentDB.insert(data)

    wiz.response.status(200)

def update():
    id = wiz.request.query("id", True)
    comment = commentDB.get(id=id)

    data = dict()
    if comment['status'] == "show":
        data['status'] = "edit"
        commentDB.update(data, id=id)
    else:
        content = wiz.request.query("content", True)
        data['status'] = "show"
        data['content'] = content
        commentDB.update(data, id=id)

    wiz.response.status(200)


def remove():
    id = wiz.request.query("id", True)

    data = dict()
    data['status'] = 'delete'
    commentDB.update(data, id=id)

    wiz.response.status(200)
