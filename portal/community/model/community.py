import peewee as pw
base = wiz.model("orm_base")

class Model(base):
    class Meta:
        db_table = 'community'

    id = pw.IntegerField(primary_key=True, index=True)
    category = pw.CharField(max_length=16)
    priority = pw.IntegerField()
    user = pw.CharField(max_length=20)
    title = pw.CharField(max_length=128)
    content = base.TextField()
    created = pw.DateTimeField()
    updated = pw.DateTimeField()