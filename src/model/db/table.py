import peewee as pw
orm = wiz.model("portal/season/orm")
base = orm.base()

class Model(base):
    class Meta:
        db_table = 'table'

    id = pw.CharField(primary_key=True)
    name = pw.CharField(max_length=16)
    title = pw.CharField(max_length=16)
    email = pw.CharField(max_length=64)
    role = pw.CharField(max_length=8)
    created = pw.DateTimeField()
    updated = pw.DateTimeField()