# Generated by Django 3.1.7 on 2021-03-24 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hairmodel',
            name='image',
            field=models.ImageField(null=True, upload_to='', verbose_name='image'),
        ),
    ]
