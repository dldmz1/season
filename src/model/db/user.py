import peewee as pw
orm = wiz.model("portal/season/orm")
base = orm.base()

class Model(base):
    class Meta:
        db_table = 'user'

    id = pw.CharField(primary_key=True)
    mail = pw.CharField(max_length=64)
    password = base.PasswordField()
    name = pw.CharField(max_length=20)
    role = pw.CharField(max_length=16)
    title = pw.CharField(max_length=32)
    created = pw.DateTimeField()
    updated = pw.DateTimeField()