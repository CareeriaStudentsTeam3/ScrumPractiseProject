# Generated by Django 3.1.7 on 2021-04-26 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0010_auto_20210426_2037'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment_timespan',
            name='status',
            field=models.CharField(choices=[('FREE', 'vapaa'), ('UNCONFIRMED', 'vahvistamaton varaus'), ('CONFIRMED', 'varattu')], default='FREE', max_length=50, verbose_name='status'),
        ),
    ]
