# Generated by Django 3.1.7 on 2021-03-27 09:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0002_auto_20210327_1125'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='name',
        ),
    ]
