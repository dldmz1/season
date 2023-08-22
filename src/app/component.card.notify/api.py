def list():
    data = [
        { "title": "title1", "date": "2023-07-04 16:12:54", "content": "content1", "show": False },
        { "title": "title2", "date": "2023-07-04 14:54:43", "content": "content2", "show": False },
        { "title": "title3", "date": "2023-07-04 13:42:23", "content": "content3", "show": True },
    ]
    wiz.response.status(200, data)
