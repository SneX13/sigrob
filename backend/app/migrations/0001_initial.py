# Generated by Django 4.0.4 on 2022-06-04 17:03

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('company', models.CharField(max_length=255)),
                ('is_admin', models.BooleanField()),
            ],
        ),
    ]
