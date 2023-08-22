import peewee as pw
orm = wiz.model("portal/season/orm")
base = orm.base()

class Model(base):
    class Meta:
        db_table = 'community'

    id = pw.IntegerField(primary_key=True, index=True)
    category = pw.CharField(max_length=16)
    priority = pw.IntegerField()
    user = pw.CharField(max_length=20)
    title = pw.CharField(max_length=128)
    comment = pw.IntegerField()
    content = pw.TextField()
    files = pw.TextField()
    created = pw.DateTimeField()
    updated = pw.DateTimeField()