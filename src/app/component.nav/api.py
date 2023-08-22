def user():
    name = wiz.session.get('name')
    wiz.response.status(200, name)