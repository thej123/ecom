# Generated by Django 3.0.8 on 2020-12-29 22:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='decription',
            new_name='description',
        ),
    ]
