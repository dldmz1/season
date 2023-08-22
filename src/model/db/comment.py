import peewee as pw
orm = wiz.model("portal/season/orm")
base = orm.base()

class Model(base):
    class Meta:
        db_table = 'comment'

    id = pw.IntegerField(primary_key=True, index=True)
    post = pw.IntegerField()
    user = pw.CharField(max_length=20)
    content = pw.TextField()
    status = pw.CharField(max_length=8)
    created = pw.DateTimeField()
    updated = pw.DateTimeField()