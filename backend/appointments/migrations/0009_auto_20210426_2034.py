# Generated by Django 3.1.7 on 2021-04-26 17:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0008_auto_20210406_1043'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment_timespan',
            name='status',
            field=models.CharField(choices=[('FREE', 'vapaa'), ('UNCONFIRMED', 'vahvistamaton varaus'), ('CONFIRMED', 'varattu')], default='FREE', max_length=50, verbose_name='status'),
        ),
        migrations.AlterField(
            model_name='hairmodel',
            name='gender',
            field=models.CharField(choices=[('FEMALE', 'nainen'), ('MALE', 'mies'), ('OTHER', 'muu/en halua määritellä')], default='OTHER', max_length=10, verbose_name='gender'),
        ),
        migrations.AlterField(
            model_name='hairmodel',
            name='hair_length',
            field=models.CharField(choices=[('LONG', 'pitkät'), ('MEDIUM', 'puolipitkät'), ('SHORT', 'lyhyet')], default='MEDIUM', max_length=20, verbose_name='hair_length'),
        ),
        migrations.AlterField(
            model_name='service',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=6, verbose_name='price'),
        ),
    ]