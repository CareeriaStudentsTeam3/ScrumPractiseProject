# Generated by Django 3.1.7 on 2021-04-06 05:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0004_auto_20210327_1147'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='appointment_date',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='place',
        ),
        migrations.AlterField(
            model_name='service',
            name='max_group_size',
            field=models.IntegerField(verbose_name='max_group_size'),
        ),
    ]
