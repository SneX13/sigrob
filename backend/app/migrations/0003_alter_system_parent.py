# Generated by Django 4.0.4 on 2022-06-05 15:45

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('app', '0002_remove_ids'),
    ]

    operations = [
        migrations.AlterField(
            model_name='system',
            name='parent',
            field=models.IntegerField(null=True),
        ),
    ]
